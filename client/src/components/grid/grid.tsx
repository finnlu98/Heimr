import React, { useEffect, useRef, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
} from "@dnd-kit/core";

import { PreviewState } from "./model/grid-models";
import WidgetContainer from "./widget/widget-container";
import GridService from "./service/grid-service";
import { MoveType } from "./model/move-type";
import { widgetMap } from "../widgets/model/wigets";
import { useDashboard } from "../dashboard/dashboard-context";


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

      const columns = 12
      const cellSize = Math.ceil(width / columns);
      const gap = 5

      onGridResize({ width, height, cellSize, columns, gap});
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);


  const handleDragMove = (event: DragMoveEvent) => {
    const { active, delta } = event;
    const id = active.id as string;

    const isResize = id.endsWith("-resize");
    const baseId = isResize ? id.replace(/-resize$/, "") : id; // has to be a better way to do this

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
        var updateItem = GridService.computeResize(box, gridMetaData, delta)
        setPreview(null)
        updateWidget(updateItem);
      } else {
        var updateItem = GridService.computeMove(id.toString(), widgets, box, gridMetaData, delta, true)
        setPreview(null)
        updateWidget(updateItem);
      }
    }
  };

  const gridStyle: React.CSSProperties  =  {
      position: "relative",
      width: "100%",
      height: "100%",
      backgroundSize: gridMetaData ? `${gridMetaData.cellSize}px ${gridMetaData.cellSize}px` : undefined,
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
            id={item.id}
            position={item.position}
            box={item.box}
            widget={widgetMap[item.widget] }
            gridData={gridMetaData}
          />
        ))}

        {preview && (
          <div
            style={{
              position: "absolute",
              left: preview.x,
              top: preview.y,
              width: preview.width,
              height: preview.height,
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




