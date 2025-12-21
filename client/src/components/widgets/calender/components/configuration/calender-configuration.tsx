import React from "react";
import { useDashboard } from "../../../../dashboard/dashboard-context";
import { CalenderConfig } from "../../CalenderWidget";
import { WidgetEnum } from "../../../model/widget-type";

interface CalenderConfigurationProps {}

const CalenderConfiguration: React.FC<CalenderConfigurationProps> = () => {
  const { widgetConfigs, setWidgetConfig } = useDashboard();
  const config = (widgetConfigs[WidgetEnum.calender] as CalenderConfig) ?? {
    calenderId: "",
    calenderKey: "",
  };

  const handleChange = (newConfig: Partial<CalenderConfig>) => {
    setWidgetConfig(WidgetEnum.calender, {
      ...config,
      ...newConfig,
    });
  };

  return (
    <div className="h-row">
      <div className="h-column">
        <label htmlFor="caledenderId">Calender ID:</label>
        <input
          type="text"
          value={config.calenderId || ""}
          onChange={(e) => handleChange({ calenderId: e.target.value })}
        />
      </div>
      <div className="h-column">
        <label htmlFor="calenderKey">Calender Key:</label>
        <input
          type="text"
          value={config.calenderKey || ""}
          onChange={(e) => handleChange({ calenderKey: e.target.value })}
        />
      </div>
    </div>
  );
};

export default CalenderConfiguration;
