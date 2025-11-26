import React from "react";
import { useDashboard } from "../../dashboard/dashboard-context";
import { CiEdit } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import "./edit-mode-button.css"

const EditModeToggleButton: React.FC = () => {
  const { editMode, toggleEditMode } = useDashboard();

  return (
    <div
        onClick={toggleEditMode}
        className={`edit-button ${editMode ? "active" : ""}`}
        >
        {editMode ?  <IoClose /> : <CiEdit />}
    </div>
  );
};

export default EditModeToggleButton