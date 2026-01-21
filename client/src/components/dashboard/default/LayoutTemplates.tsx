import { useDashboard } from "../dashboard-context";
import "./LayoutTemplates.css";
import { useState } from "react";
import defaultTemplate from "./templates/DefaultTemplate";

const LayoutTemplates: React.FC = () => {
  const [layoutSelected, setLayoutSelected] = useState<boolean>(false);
  const { setWidgets } = useDashboard();

  function applyDefaultTemplate() {
    if (!layoutSelected) return;
    setWidgets(defaultTemplate);
  }

  return (
    <div>
      <div
        className={`square layout-square${layoutSelected ? " selected" : ""}`}
        onClick={() => setLayoutSelected(!layoutSelected)}
      >
        Default layout
      </div>
      <div className="action-buttons-right">
        <button onClick={applyDefaultTemplate} disabled={!layoutSelected}>
          Apply Template
        </button>
      </div>
    </div>
  );
};
export default LayoutTemplates;
