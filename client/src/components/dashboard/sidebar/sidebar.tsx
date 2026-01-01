import { useDashboard } from "../dashboard-context";
import { WidgetEnum } from "../../widgets/model/widget-type";
import { IoAddCircle } from "react-icons/io5";
import { IoMdArrowDropright } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import "./sidebar.css";
import { Modal } from "../../shared/modal/modal";
import { useState } from "react";
import WidgetConfiguration from "../grid/widget/widget-configuration";
import { Widgets } from "../../widgets/model/wigets";

const Sidebar: React.FC = () => {
  const { editMode, addWidget } = useDashboard();
  const [editWidget, setEditWidget] = useState<{
    edit: boolean;
    widgetKey: WidgetEnum | null;
  }>({
    edit: false,
    widgetKey: null,
  });

  const toggleEditWidget = () => {
    setEditWidget((prev) => {
      return { ...prev, edit: !prev.edit };
    });
  };

  const setWidgetKeyAndToggleEdit = (key: WidgetEnum) => {
    setEditWidget((prev) => {
      return {
        edit: !prev.edit,
        widgetKey: key,
      };
    });
  };

  return (
    <>
      <div className={`sidebar ${editMode ? "edit-mode" : ""}`}>
        {editMode && (
          <div className="widget-menu-title">
            <div>
              <IoMdArrowDropright /> Widget menu
            </div>
          </div>
        )}
        {Widgets &&
          editMode &&
          Object.entries(Widgets).map(([key, entries]) => (
            <div key={key} className="widget-menu-row">
              <div className="item friendly-display">
                <div className="friendly-display-item">
                  {entries.widgetIcon}{" "}
                </div>
                <div className="friendly-display-item">
                  {entries.friendlyName}{" "}
                </div>
              </div>
              <div className="item widget-action-buttons">
                <div className="icon">
                  <CiEdit
                    onClick={() => setWidgetKeyAndToggleEdit(key as WidgetEnum)}
                  />
                </div>
                <div className="icon" onClick={() => addWidget(entries.id)}>
                  <IoAddCircle />
                </div>
              </div>
            </div>
          ))}
        {editWidget && (
          <Modal
            open={editWidget.edit}
            onClose={toggleEditWidget}
            title={`Configure ${editWidget.widgetKey}`}
          >
            {editWidget.widgetKey && (
              <WidgetConfiguration widget={editWidget.widgetKey} />
            )}
          </Modal>
        )}
      </div>
    </>
  );
};

export default Sidebar;
