import React, { useEffect, useRef, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  useDraggable,
} from "@dnd-kit/core";
import LaundryWeek from "../widgets/laundry-week/laundry-week";
import Dailyweather from "../widgets/weather/daily-weather";
import HomeActionButtons from "../widgets/home/components/home-action-buttons";


interface Position {
  x: number;
  y: number;
}

interface Box {
  
  width: number;
  height: number
}

interface DraggableBoxProps {
  id: string;
  position: Position;
  box: Box
  widget: React.ReactNode

}


const DraggableBox: React.FC<DraggableBoxProps> = ({ id, position, box, widget }) => {
   const {
    attributes,
    listeners,
    setNodeRef,
    transform: moveTransform,
  } = useDraggable({ id });

  // Resize drag (bottom-right handle)
  const {
    attributes: resizeAttributes,
    listeners: resizeListeners,
    setNodeRef: setResizeRef,
  } = useDraggable({ id: `${id}-resize` });

  const finalX = position.x + (moveTransform?.x ?? 0);
  const finalY = position.y + (moveTransform?.y ?? 0);


  const style: React.CSSProperties = {
    position: "absolute",
    width: box.width,
    height: box.height,
    background: "orange",
    borderRadius: 8,
    cursor: "grab",
    transform: `translate(${finalX}px, ${finalY}px)`,
  };

  const resizeHandleStyle: React.CSSProperties = {
    position: "absolute",
    width: 16,
    height: 16,
    right: 0,
    bottom: 0,
    cursor: "se-resize",
    background: "rgba(0,0,0,0.3)",
    borderTopLeftRadius: 8,
  };


  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      <div
        ref={setResizeRef}
        {...resizeListeners}
        {...resizeAttributes}
        style={resizeHandleStyle}
      />
      {widget}
    </div>
  );
};

type GridItem = {
  id: string;
  position: Position;
  box: Box
  widget: React.ReactNode
};


export const Grid: React.FC = () => {

  const initialItems: GridItem[] = [
    { id: "box-1", position: { x: 0, y: 0 }, box: {width: 250, height: 200}, widget: <LaundryWeek /> },
    { id: "box-2", position: { x: 300, y: 40 }, box: {width: 350, height: 250}, widget: <Dailyweather /> },
    { id: "box-3", position: { x: 100 * 2, y: 40 * 10 }, box: {width: 300, height: 50}, widget: <HomeActionButtons />},
  ];

  const [boxes, setBox] = useState<GridItem[]>(initialItems);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [gridSize, setGridSize] = useState({ width: 0, height: 0 });

  const COLUMNS = 12
  const cellSize = Math.ceil(gridSize.width / COLUMNS);
  const CELL_SIZE = cellSize;   


  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(entries => {
      const entry = entries[0];
      const { width, height } = entry.contentRect;

      setGridSize({ width, height });
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);


  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const id = active.id;

    setBox((prev) => {
      return prev.map((box) => {

        if (id === box.id) {
          const nextX = box.position.x + delta.x;
          const nextY = box.position.y + delta.y;

          const snappedX = Math.round(nextX / CELL_SIZE) * CELL_SIZE;
          const snappedY = Math.round(nextY / CELL_SIZE) * CELL_SIZE;

          const maxX = gridSize.width - box.box.width;
          const maxY = gridSize.height - box.box.height;

          const targetX = Math.min(Math.max(0, snappedX), maxX);
          const targetY = Math.min(Math.max(0, snappedY), maxY);

          const candidate: Rect = {
            left: targetX,
            top: targetY,
            right: targetX + box.box.width,
            bottom: targetY + box.box.height,
          };

          const hasCollision = prev.some((item) => {
            if (item.id === id) 
              return false;

            const other: Rect = {
              left: item.position.x,
              top: item.position.y,
              right: item.position.x + item.box.width,
              bottom: item.position.y + item.box.height,
            };

            return rectanglesOverlap(candidate, other);
          });

          if (hasCollision) {
            return box;
          }

          return {
            ...box,
            position: { x: targetX, y: targetY },
          };
        }


        if(id === `${box.id}-resize`) {
          const nextWidth = box.box.width + delta.x;
          const nextHeight = box.box.height + delta.y;

          const snappedWidth = Math.max(CELL_SIZE, Math.round(nextWidth / CELL_SIZE) * CELL_SIZE);
          const snappedHeight = Math.max(CELL_SIZE, Math.round(nextHeight / CELL_SIZE) * CELL_SIZE);

          return {
            ...box,
            box: {width: snappedWidth, height: snappedHeight}
          };
        }

        return box

      });
    });
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        border: "1px solid #ddd",
        backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
        backgroundImage:
          "linear-gradient(to right, #eee 1px, transparent 1px)," +
          "linear-gradient(to bottom, #eee 1px, transparent 1px)",
      }}
    >
      <DndContext onDragEnd={handleDragEnd}>
        {boxes.map((item) => (
          <DraggableBox
            key={item.id}
            id={item.id}
            position={item.position}
            box={item.box}
            widget={item.widget}
          />
        ))}
        
      </DndContext>
    </div>
  );
};


type Rect = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

function rectanglesOverlap(a: Rect, b: Rect): boolean {
  return !(
    a.right <= b.left || 
    a.left >= b.right || 
    a.bottom <= b.top || 
    a.top >= b.bottom    
  );
}