import { useDashboard } from "../../../context/dashboard-context";
import { IoAddCircle } from "react-icons/io5";
import { IoMdArrowDropright } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import "./sidebar.css";
import { useEffect, useState } from "react";
import Profile from "../../auth/Profile";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import EditEntity from "../editMode/edit-entity";
import { EditingKey } from "../model/EditMode";
import { Widgets } from "../../../widgets/core/model/wigets";

const Sidebar: React.FC = () => {
  const { editMode, addWidget, setEditingKey } = useDashboard();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (editMode.editMode === false) {
      setCollapsed(false);
    }
  }, [editMode.editMode]);

  return (
    <>
      <div className={`sidebar ${editMode.editMode ? "edit-mode" : ""} ${collapsed ? "collapsed" : ""}`}>
        {editMode.editMode && !collapsed && (
          <>
            <div className="widget-menu-row surface animate-appear-left">
              <Profile />
            </div>
            <div className="sidebar-title animate-appear-left">
              <div>
                <IoMdArrowDropright /> Home
              </div>
            </div>
            <div className="widget-menu-row surface animate-appear-left">
              <div className="item friendly-display-item">Home settings</div>
              <div className="item widget-action-buttons">
                <CiEdit className="icon" onClick={() => setEditingKey(EditingKey.profile)} />
              </div>
            </div>
            <div className="sidebar-title animate-appear-left">
              <div>
                <IoMdArrowDropright /> Templates
              </div>
            </div>

            <div className="widget-menu-row surface animate-appear-left">
              <div className="item friendly-display-item">Layout templates</div>
              <div className="item widget-action-buttons">
                <IoAddCircle className="icon" onClick={() => setEditingKey(EditingKey.layoutTemplate)} />
              </div>
            </div>
            <div className="sidebar-title animate-appear-left">
              <div>
                <IoMdArrowDropright /> Widget menu
              </div>
            </div>
          </>
        )}
        {Widgets &&
          editMode.editMode &&
          !collapsed &&
          Object.entries(Widgets)
            .filter(([key, entries]) => !entries.boolenHiddenSupported)
            .map(([key, entries]) => (
              <div key={key} className="widget-menu-row surface animate-appear-left">
                <div className="item friendly-display">
                  <div className="friendly-display-item">{entries.widgetIcon} </div>
                  <div className="friendly-display-item">{entries.friendlyName} </div>
                </div>
                <div className="item widget-action-buttons">
                  <div className="icon">
                    <CiEdit onClick={() => setEditingKey(key as unknown as EditingKey)} />
                  </div>
                  <div className="icon" onClick={() => addWidget(entries.id)}>
                    <IoAddCircle />
                  </div>
                </div>
              </div>
            ))}
        <div className="sidebar-footer widget-menu-row surface " onClick={() => setCollapsed(!collapsed)}>
          <button className="button-text-only font-large animate-appear-left">
            {collapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
          </button>
        </div>
      </div>
      <EditEntity onClose={() => setEditingKey(null)} editKey={editMode.editingWidgetKey} />
    </>
  );
};

export default Sidebar;
