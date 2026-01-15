import { FaRegSave } from "react-icons/fa";
import { useDashboard } from "../../../../dashboard/dashboard-context";
import { WidgetEnum } from "../../../model/widget-type";
import { CityBikeConfig } from "../../CityBikeWidget";
import { useState } from "react";

const CityBikeConfiguration: React.FC = () => {
  const { widgetConfigs, setWidgetConfig } = useDashboard();
  const config = (widgetConfigs[WidgetEnum.cityBike] as CityBikeConfig) ?? {
    homeCoordinates: { lat: "", lon: "" },
    centerCoordinates: { lat: "", lon: "" },
    zoom: "",
    stations: [],
  };

  const [localConfig, setLocalConfig] = useState(config);

  const handleChange = (newConfig: Partial<CityBikeConfig>) => {
    setLocalConfig({
      ...localConfig,
      ...newConfig,
    });
  };

  const saveConfig = () => {
    setWidgetConfig(WidgetEnum.cityBike, localConfig);
  };
  return (
    <div className="h-row">
      <div className="h-column">
        <div className="h-column">
          <label htmlFor="homeId">Home coordinates:</label>
          <div className="h-row">
            <input
              type="text"
              placeholder="Latitute"
              value={localConfig.homeCoordinates.lat ?? ""}
              onChange={(e) =>
                handleChange({
                  homeCoordinates: {
                    ...localConfig.homeCoordinates,
                    lat: e.target.value,
                  },
                })
              }
            />
            <input
              type="text"
              placeholder="Longitude"
              value={localConfig.homeCoordinates.lon ?? ""}
              onChange={(e) =>
                handleChange({
                  homeCoordinates: {
                    ...localConfig.homeCoordinates,
                    lon: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>
        <div className="h-column">
          <label htmlFor="centerId">Center coordinates:</label>
          <div className="h-row">
            <input
              type="text"
              placeholder="Latitute"
              value={localConfig.centerCoordinates.lat}
              onChange={(e) =>
                handleChange({
                  centerCoordinates: {
                    ...localConfig.centerCoordinates,
                    lat: e.target.value,
                  },
                })
              }
            />
            <input
              type="text"
              placeholder="Longitude"
              value={localConfig.centerCoordinates.lon}
              onChange={(e) =>
                handleChange({
                  centerCoordinates: {
                    ...localConfig.centerCoordinates,
                    lon: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>
        <div className="h-column">
          <label htmlFor="zoom">Zoom:</label>
          <div className="h-row">
            <input
              type="number"
              placeholder="Zoom (eg. 12)"
              value={localConfig.zoom}
              onChange={(e) => handleChange({ zoom: Number(e.target.value) })}
            />
          </div>
        </div>
        <div className="h-column">
          <label htmlFor="stations">Station IDs (comma separated):</label>
          <div className="h-row">
            <input
              type="text"
              placeholder="Station IDs eg. 123, 456, 789"
              value={localConfig.stations.join(", ")}
              onChange={(e) =>
                handleChange({
                  stations: e.target.value.split(",").map((s) => s.trim()),
                })
              }
            />
            <button onClick={saveConfig}>
              Save <FaRegSave />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityBikeConfiguration;
