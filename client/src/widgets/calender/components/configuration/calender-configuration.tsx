import React, { useState } from "react";
import { CalenderConfig } from "../../CalenderWidget";
import { MdDelete } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { WidgetEnum } from "../../../core/model/widget-type";

interface CalenderConfigurationProps {
  config?: CalenderConfig;
  setConfig: (newConfig: CalenderConfig) => void;
}

const defaultConfig: CalenderConfig = {
  calenderId: "",
  calenderKey: "",
  calenderICalEndpoints: [],
};

const CalenderConfiguration: React.FC<CalenderConfigurationProps> = ({ config = defaultConfig, setConfig }) => {
  const [newEndpoint, setNewEndpoint] = useState<string>("");

  const addEndpoint = (newConfig: Partial<CalenderConfig>) => {
    setConfig({
      ...config,
      ...newConfig,
    });
    setNewEndpoint("");
  };

  const removeEndpoint = (index: number) => {
    const updatedEndpoints = config.calenderICalEndpoints.filter((_, i) => i !== index);
    addEndpoint({ calenderICalEndpoints: updatedEndpoints });
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
          <button
            onClick={() => addEndpoint({ calenderICalEndpoints: [...config.calenderICalEndpoints, newEndpoint] })}
          >
            <IoAddCircle />
          </button>
        </div>
      </div>
    </>
  );
};

export default CalenderConfiguration;
