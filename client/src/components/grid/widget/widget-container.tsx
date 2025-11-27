import {
  useDraggable,
} from "@dnd-kit/core";

import { GridItem, GridMetaData } from "../model/grid-models";
import { useDashboard } from "../../dashboard/dashboard-context";
import { MdDelete } from "react-icons/md";
import { widgetMap } from "../../widgets/model/wigets";

interface WidgetContainerProps {
  gridItem: GridItem
  gridData: GridMetaData

}

const WidgetContainer: React.FC<WidgetContainerProps> = ({ gridItem, gridData }) => {
  const {id} = gridItem 

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

  const {editMode, removeWidget} = useDashboard();

  // const step = gridData.cellSize;
  const transform = moveTransform ?? { x: 0, y: 0 };

  const baseX = gridItem.col * gridData.colWidth;
  const baseY = gridItem.row * gridData.colHeight;

  const finalX = baseX + transform.x + gridData.gap;
  const finalY = baseY + transform.y + gridData.gap

  const widthPx  = gridItem.colSpan * gridData.colWidth;
  const heightPx = gridItem.rowSpan * gridData.colHeight;

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

  const topRightHandleStyle: React.CSSProperties = {
    position: "absolute",
    width: 16,
    height: 16,
    right: 0,
    top: 0,
    cursor: "pointer",       
    background: "rgba(0,0,0,0.3)",
    borderBottomLeftRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };


  return (
    <div ref={setNodeRef} {...(editMode ? listeners : {})} {...(editMode ? attributes : {})} style={style} className="widget-container">
      {editMode && 
        <div style={topRightHandleStyle} onPointerDown={(e) => e.stopPropagation()}
           onClick={(e) => {
            e.stopPropagation();        
            removeWidget(id)
        }}>
        <MdDelete />
      </div>
      }
      
      {editMode && <div
        ref={setResizeRef}
        {...resizeListeners}
        {...resizeAttributes}
        style={resizeHandleStyle}
      />}
      { widgetMap[gridItem.widget]}
    </div>
  );
};

export default WidgetContainer