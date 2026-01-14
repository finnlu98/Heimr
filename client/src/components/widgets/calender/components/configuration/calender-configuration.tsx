import React, { useState } from "react";
import { useDashboard } from "../../../../dashboard/dashboard-context";
import { CalenderConfig } from "../../CalenderWidget";
import { WidgetEnum } from "../../../model/widget-type";
import { MdDelete } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";

interface CalenderConfigurationProps {}

const CalenderConfiguration: React.FC<CalenderConfigurationProps> = () => {
  const { widgetConfigs, setWidgetConfig } = useDashboard();
  const config = (widgetConfigs[WidgetEnum.calender] as CalenderConfig) ?? {
    calenderId: "",
    calenderKey: "",
    calenderICalEndpoints: [],
  };
  const [newEndpoint, setNewEndpoint] = useState<string>("");

  const saveConfig = (newConfig: Partial<CalenderConfig>) => {
    setWidgetConfig(WidgetEnum.calender, {
      ...config,
      ...newConfig,
    });
    setNewEndpoint("");
  };

  const removeEndpoint = (index: number) => {
    const updatedEndpoints = config.calenderICalEndpoints.filter((_, i) => i !== index);
    saveConfig({ calenderICalEndpoints: updatedEndpoints });
  };
  return (
    <>
      <div className="h-column gap-large">
        <label>iCal links:</label>
        {config?.calenderICalEndpoints?.map((endpoint, index) => (
          <div className="h-row gap-large" key={index}>
            <div>
              <p>{endpoint.length > 50 ? `${endpoint.substring(0, 25)}...` : endpoint}</p>
            </div>
            <button className="button-text-only-padding" onClick={() => removeEndpoint(index)}>
              <MdDelete />
            </button>
          </div>
        ))}
        <div className="h-row gap-large">
          <input type="text" value={newEndpoint} onChange={(e) => setNewEndpoint(e.target.value)} />
          <button onClick={() => saveConfig({ calenderICalEndpoints: [...config.calenderICalEndpoints, newEndpoint] })}>
            <IoAddCircle />
          </button>
        </div>
      </div>
    </>
  );
};

export default CalenderConfiguration;
