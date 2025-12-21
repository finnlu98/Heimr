import React, { useEffect, useRef } from "react";
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
} from "@dnd-kit/core";

import { PreviewState } from "./model/grid-models";
import WidgetContainer from "./widget/widget-container";
import GridService from "./service/grid-service";
import { MoveType } from "./model/move-type";
import { useDashboard } from "../dashboard-context";

const COLUMNS = 24;
const GAP = 5
const ROW_ASPECT = 1

export const Grid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [preview, setPreview] = React.useState<PreviewState | null>(null);
  const { widgets, updateWidget } = useDashboard();
  const {editMode, gridMetaData, onGridResize} = useDashboard()  
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(entries => {
      const entry = entries[0];
      const { width, height } = entry.contentRect;

      const columns = COLUMNS
      const colWidth = width / columns;

      const idealColHeight = colWidth / ROW_ASPECT;
      const maxRows = Math.floor(height / idealColHeight);
      const colHeight = height / maxRows;

      const gap = GAP
      

      onGridResize({ width, height, colWidth, colHeight, columns, gap});
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [onGridResize]);


  const handleDragMove = (event: DragMoveEvent) => {
    const { active, delta } = event;
    const id = active.id as string;

    const isResize = id.endsWith("-resize");
    const baseId = isResize ? id.replace(/-resize$/, "") : id; 

    const current = widgets.find((b) => b.id === baseId);
    if (!current || !gridMetaData) {
      setPreview(null);
      return;
    }

    const moveType = isResize ? MoveType.resize : MoveType.move;

    const shadowBox = GridService.computeShadow(id, widgets, current, gridMetaData, delta, moveType)
    if(shadowBox) 
      setPreview(shadowBox) 
  }
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const id = active.id;

    const isResize = id.toString().endsWith("-resize");
    const baseId = isResize ? id.toString().replace(/-resize$/, "") : id; 
    
    const box = widgets.find((b) => b.id === baseId);

    if(box && gridMetaData) {
      if(id.toString().includes("resize")) {
        
        var updateItemResize = GridService.computeResize(box, gridMetaData, delta)
        setPreview(null)
        updateWidget(updateItemResize);
      } else {
        var updateItemMove = GridService.computeMove(id.toString(), widgets, box, gridMetaData, delta, true)
        setPreview(null)
        updateWidget(updateItemMove);
      }
    }
  };

  const gridStyle: React.CSSProperties  =  {
      position: "relative",
      width: "100%",
      height: "100%",
      backgroundSize: gridMetaData ? `${gridMetaData.colWidth}px ${gridMetaData.colHeight}px` : undefined,
      border: editMode ? "1px solid #ddd" : undefined,
      backgroundImage: editMode ?
          ("linear-gradient(to right, #eee 1px, transparent 1px)," +
          "linear-gradient(to bottom, #eee 1px, transparent 1px)") : undefined,
      backgroundColor: editMode ?  "#d3d3d33f" : undefined 
  }

  return (
    <div
      ref={containerRef}
      style={gridStyle}
    >
      <DndContext onDragMove={handleDragMove} onDragEnd={handleDragEnd}>
        {gridMetaData && widgets.map((item) => (
          <WidgetContainer
            key={item.id}
            gridItem={item}
            gridData={gridMetaData}
          />
        ))}

        {preview && gridMetaData && (
          <div
            style={{
              position: "absolute",
              left: preview.col * gridMetaData?.colWidth,
              top: preview.row * gridMetaData?.colHeight,
              width: preview.colSpan * gridMetaData?.colWidth,
              height: preview.rowSpan * gridMetaData?.colHeight,
              borderRadius: 8,
              border: "2px dashed rgba(0,0,0,0.4)",
              background: "rgba(0,0,0,0.05)",
              pointerEvents: "none",
              zIndex: 999
            }}
          />
        )}
        
      </DndContext>
    </div>
  );
};




