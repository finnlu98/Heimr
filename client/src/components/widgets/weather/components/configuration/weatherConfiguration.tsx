import { FaRegSave } from "react-icons/fa";
import { useDashboard } from "../../../../dashboard/dashboard-context";
import { WidgetEnum } from "../../../model/widget-type";
import { WeatherConfig } from "../../WeatherWidget";
import { useState } from "react";

const WeatherConfiguration: React.FC = () => {
  const { widgetConfigs, setWidgetConfig } = useDashboard();
  const config = (widgetConfigs[WidgetEnum.weather] as WeatherConfig) ?? {
    lat: "",
    lon: "",
  };
  const [lat, setLat] = useState(config.lat || "");
  const [lon, setLon] = useState(config.lon || "");

  const saveConfig = () => {
    setWidgetConfig(WidgetEnum.weather, {
      lat,
      lon,
    });
  };

  return (
    <div className="h-row">
      <div className="h-column">
        <label htmlFor="lat">Latitude:</label>
        <input type="text" value={lat} onChange={(e) => setLat(e.target.value)} />
      </div>
      <div className="h-column">
        <label htmlFor="lon">Longitude:</label>
        <div className="h-row">
          <input type="text" value={lon} onChange={(e) => setLon(e.target.value)} />
          <button onClick={saveConfig}>
            Save <FaRegSave />
          </button>
        </div>
      </div>
    </div>
  );
};
export default WeatherConfiguration;
