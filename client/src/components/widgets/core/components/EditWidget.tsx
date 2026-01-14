import { useState } from "react";
import { WidgetEnum } from "../../model/widget-type";
import { Modal } from "../../../shared/modal/modal";
import WidgetConfiguration from "../../../dashboard/grid/widget/widget-configuration";
import { useDashboard } from "../../../dashboard/dashboard-context";

interface EditWidgetProps {
  widgetKey: WidgetEnum;
}

const EditWidget: React.FC<EditWidgetProps> = ({ widgetKey }) => {
  const [editWidget, setEditWidget] = useState<boolean>(false);
  const { editMode, toggleEditMode } = useDashboard();
  return (
    <>
      <div>
        <p>Configuration is missing for {widgetKey}</p>
        <button onClick={toggleEditMode} disabled={editMode}>
          Edit widgets
        </button>
      </div>
      {editWidget && (
        <Modal open={editWidget} onClose={() => setEditWidget(false)} title={`Configure ${widgetKey}`}>
          {widgetKey && <WidgetConfiguration widget={widgetKey} />}
        </Modal>
      )}
    </>
  );
};

export default EditWidget;
