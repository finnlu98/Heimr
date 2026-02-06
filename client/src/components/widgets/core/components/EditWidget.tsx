import { useDashboard } from "../../../dashboard/dashboard-context";
import { EditingKey } from "../../../dashboard/model/EditMode";
import { WidgetEnum } from "../model/widget-type";

interface EditWidgetProps {
  widgetKey: WidgetEnum;
}

const EditWidget: React.FC<EditWidgetProps> = ({ widgetKey }) => {
  const { editMode, toggleEditMode, setEditingKey } = useDashboard();

  function handleEditClick(e: React.MouseEvent) {
    if (!editMode.editMode) {
      toggleEditMode(widgetKey as unknown as EditingKey);
    } else {
      setEditingKey(widgetKey as unknown as EditingKey);
    }
  }

  return (
    <div className="h-column">
      <p>Configuration is missing for {widgetKey}</p>
      <button onPointerDown={(e) => e.stopPropagation()} onClick={handleEditClick}>
        Edit widgets
      </button>
    </div>
  );
};

export default EditWidget;
