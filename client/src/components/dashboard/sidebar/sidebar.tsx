import { useDashboard } from "../dashboard-context";
import { WidgetEnum } from "../../widgets/model/widget-type";
import { IoAddCircle } from "react-icons/io5";
import { IoMdArrowDropright } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import "./sidebar.css";
import { useState } from "react";
import { Widgets } from "../../widgets/model/wigets";
import Profile from "../../auth/Profile";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import EditEntity from "../editMode/edit-entity";
import { EditingKey } from "../model/EditMode";

const Sidebar: React.FC = () => {
  const { editMode, addWidget, setEditingKey } = useDashboard();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <div className={`sidebar ${editMode.editMode ? "edit-mode" : ""} ${collapsed ? "collapsed" : ""}`}>
        {editMode.editMode && !collapsed && (
          <>
            <div className="widget-menu-row">
              <Profile />
            </div>
            <div className="sidebar-title">
              <div>
                <IoMdArrowDropright /> Home
              </div>
            </div>
            <div className="widget-menu-row">
              <div className="item friendly-display-item">Home settings</div>
              <div className="item widget-action-buttons">
                <CiEdit className="icon" onClick={() => setEditingKey(EditingKey.profile)} />
              </div>
            </div>
            <div className="sidebar-title">
              <div>
                <IoMdArrowDropright /> Templates
              </div>
            </div>

            <div className="widget-menu-row">
              <div className="item friendly-display-item">Layout templates</div>
              <div className="item widget-action-buttons">
                <IoAddCircle className="icon" onClick={() => setEditingKey(EditingKey.layoutTemplate)} />
              </div>
            </div>
            <div className="sidebar-title">
              <div>
                <IoMdArrowDropright /> Widget menu
              </div>
            </div>
          </>
        )}
        {Widgets &&
          editMode.editMode &&
          !collapsed &&
          Object.entries(Widgets).map(([key, entries]) => (
            <div key={key} className="widget-menu-row">
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
        <div className="sidebar-footer" onClick={() => setCollapsed(!collapsed)}>
          <button className="button-text-only font-large">
            {collapsed ? <FaAngleDoubleRight fill="white" /> : <FaAngleDoubleLeft fill="white" />}
          </button>
        </div>
      </div>
      <EditEntity onClose={() => setEditingKey(null)} editKey={editMode.editingWidgetKey} />
    </>
  );
};

export default Sidebar;
