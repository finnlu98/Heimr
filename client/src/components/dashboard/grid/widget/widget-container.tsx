import { useDraggable } from "@dnd-kit/core";

import { GridItem, GridMetaData } from "../model/grid-models";
import { useDashboard } from "../../dashboard-context";
import { MdDelete } from "react-icons/md";
import GridService from "../service/grid-service";
import { Widgets } from "../../../widgets/model/wigets";
interface WidgetContainerProps {
  gridItem: GridItem;
  gridData: GridMetaData;
}

const WidgetContainer: React.FC<WidgetContainerProps> = ({ gridItem, gridData }) => {
  const { id } = gridItem;

  const { attributes, listeners, setNodeRef, transform: moveTransform } = useDraggable({ id });

  const {
    attributes: resizeAttributes,
    listeners: resizeListeners,
    setNodeRef: setResizeRef,
  } = useDraggable({ id: `${id}-resize` });

  const { editMode, removeWidget } = useDashboard();

  const style: React.CSSProperties = GridService.computeWidthAndHeight(
    gridItem,
    moveTransform,
    gridData,
    editMode.editMode,
  );

  const resizeHandleStyle: React.CSSProperties = {
    position: "absolute",
    width: 16,
    height: 16,
    right: 0,
    bottom: 0,
    cursor: "se-resize",
    background: "rgba(0,0,0,0.3)",
    borderTopLeftRadius: 8,
    zIndex: 10,
    transition: "opacity 0.3s ease",
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
    zIndex: 10,
    transition: "opacity 0.3s ease",
  };

  return (
    <div
      className={`${Widgets[gridItem.widget].defaultWidgetStyling !== false ? "widget-container" : "widget-container-no-bg"}`}
      ref={setNodeRef}
      {...(editMode.editMode ? listeners : {})}
      {...(editMode.editMode ? attributes : {})}
      style={style}
    >
      {editMode.editMode && (
        <div
          style={topRightHandleStyle}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            removeWidget(id);
          }}
        >
          <MdDelete />
        </div>
      )}

      {editMode.editMode && (
        <div ref={setResizeRef} {...resizeListeners} {...resizeAttributes} style={resizeHandleStyle} />
      )}
      <div className="widget-content">{Widgets[gridItem.widget].widgetComponent}</div>
    </div>
  );
};

export default WidgetContainer;
