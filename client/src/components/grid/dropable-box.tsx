import {
  useDraggable,
} from "@dnd-kit/core";

import { Position, Box, Rect, GridMetaData } from "./model/grid-models";
import { useDashboard } from "../dashboard/dashboard-context";

interface DraggableBoxProps {
  id: string;
  position: Position;
  box: Box
  widget: React.ReactNode
  gridData: GridMetaData

}

const DraggableBox: React.FC<DraggableBoxProps> = ({ id, position, box, widget, gridData }) => {
   const {
    attributes,
    listeners,
    setNodeRef,
    transform: moveTransform,
  } = useDraggable({ id });

  const {
    attributes: resizeAttributes,
    listeners: resizeListeners,
    setNodeRef: setResizeRef,
  } = useDraggable({ id: `${id}-resize` });

  const {editMode} = useDashboard();

  const finalX = position.x + (moveTransform?.x ?? 0);
  const finalY = position.y + (moveTransform?.y ?? 0);

  const widthPx = box.cols * gridData.cellSize;
  const heightPx = box.rows * gridData.cellSize;

  const style: React.CSSProperties = {
    position: "absolute",
    width: widthPx - gridData.gap * 2,
    height: heightPx - gridData.gap * 2,
    cursor: editMode ? "grab" : "",
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
    <div ref={setNodeRef} {...(editMode ? listeners : {})} {...(editMode ? attributes : {})} style={style} className="widget-container">
      {editMode && <div
        ref={setResizeRef}
        {...resizeListeners}
        {...resizeAttributes}
        style={resizeHandleStyle}
      />}
      {widget}
    </div>
  );
};

export default DraggableBox