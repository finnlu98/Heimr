import { useDashboard } from "../../../../dashboard/dashboard-context";
import { WidgetEnum } from "../../../model/widget-type";
import { WeatherConfig } from "../../WeatherWidget";

const WeatherConfiguration: React.FC = () => {
  const { widgetConfigs, setWidgetConfig } = useDashboard();
  const config = (widgetConfigs[WidgetEnum.weather] as WeatherConfig) ?? {
    lat: "",
    lon: "",
  };

  const handleChange = (newConfig: Partial<WeatherConfig>) => {
    setWidgetConfig(WidgetEnum.weather, {
      ...config,
      ...newConfig,
    });
  };

  return (
    <div className="h-row">
      <div className="h-column">
        <label htmlFor="lat">Latitude:</label>
        <input
          type="text"
          value={config.lat || ""}
          onChange={(e) => handleChange({ lat: e.target.value })}
        />
      </div>
      <div className="h-column">
        <label htmlFor="lon">Longitude:</label>
        <input
          type="text"
          value={config.lon || ""}
          onChange={(e) => handleChange({ lon: e.target.value })}
        />
      </div>
    </div>
  );
};
export default WeatherConfiguration;
