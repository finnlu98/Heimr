import { useDraggable } from "@dnd-kit/core";
import { GridItem, GridMetaData } from "../model/grid-models";
import { useDashboard } from "../../../../context/dashboard-context";
import { MdDelete } from "react-icons/md";
import GridService from "../service/grid-service";
import { ResizeHandles } from "../resize-handles";
import "./widget-container.css";
import { Widgets } from "../../../../widgets/core/model/wigets";
import { useWidgetQueryResult } from "../../../../widgets/core/hooks/useWidgetQueryResult";

interface WidgetContainerProps {
  gridItem: GridItem;
  gridData: GridMetaData;
}

const WidgetContainer: React.FC<WidgetContainerProps> = ({ gridItem, gridData }) => {
  const { id } = gridItem;
  const { attributes, listeners, setNodeRef, transform: moveTransform } = useDraggable({ id });
  const { editMode, removeWidget } = useDashboard();
  const queryResult = useWidgetQueryResult(gridItem.widget);

  const style: React.CSSProperties = GridService.computeWidthAndHeight(
    gridItem,
    moveTransform,
    gridData,
    editMode.editMode,
  );

  return (
    <div
      className={`${Widgets[gridItem.widget].defaultWidgetStyling !== false ? "widget-container" : "widget-container-no-bg"}`}
      ref={setNodeRef}
      {...(editMode.editMode ? listeners : {})}
      {...(editMode.editMode ? attributes : {})}
      style={style}
    >
      {editMode.editMode && (
        <div className="edit-widget-actions">
          <div
            className="edit-widget-handle"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              removeWidget(id);
            }}
          >
            <MdDelete />
          </div>
          <ResizeHandles gridItem={gridItem} />
        </div>
      )}

      <div className="widget-content">
        {(() => {
          const Component = Widgets[gridItem.widget].widgetComponent;
          return <Component data={queryResult?.data} isLoading={queryResult?.isLoading} error={queryResult?.error} />;
        })()}
      </div>
    </div>
  );
};

export default WidgetContainer;
