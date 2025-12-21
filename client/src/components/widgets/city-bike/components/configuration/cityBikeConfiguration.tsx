import { useDashboard } from "../../../../dashboard/dashboard-context";
import { WidgetEnum } from "../../../model/widget-type";
import { CityBikeConfig } from "../../CityBikeWidget";

const CityBikeConfiguration: React.FC = () => {
  const { widgetConfigs, setWidgetConfig } = useDashboard();
  const config = (widgetConfigs[WidgetEnum.cityBike] as CityBikeConfig) ?? {
    homeCoordinates: { lat: "", lon: "" },
    centerCoordinates: { lat: "", lon: "" },
    zoom: "",
    stations: [],
  };

  const handleChange = (newConfig: Partial<CityBikeConfig>) => {
    setWidgetConfig(WidgetEnum.cityBike, {
      ...config,
      ...newConfig,
    });
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
              value={config.homeCoordinates.lat ?? ""}
              onChange={(e) =>
                handleChange({
                  homeCoordinates: {
                    ...config.homeCoordinates,
                    lat: e.target.value,
                  },
                })
              }
            />
            <input
              type="text"
              placeholder="Longitude"
              value={config.homeCoordinates.lon ?? ""}
              onChange={(e) =>
                handleChange({
                  homeCoordinates: {
                    ...config.homeCoordinates,
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
              value={config.centerCoordinates.lat}
              onChange={(e) =>
                handleChange({
                  centerCoordinates: {
                    ...config.centerCoordinates,
                    lat: e.target.value,
                  },
                })
              }
            />
            <input
              type="text"
              placeholder="Longitude"
              value={config.centerCoordinates.lon}
              onChange={(e) =>
                handleChange({
                  centerCoordinates: {
                    ...config.centerCoordinates,
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
              value={config.zoom}
              onChange={(e) => handleChange({ zoom: Number(e.target.value) })}
            />
          </div>
        </div>
        <div className="h-column">
          <label htmlFor="stations">Station IDs (comma separated):</label>
          <input
            type="text"
            placeholder="Station IDs eg. 123, 456, 789"
            value={config.stations.join(", ")}
            onChange={(e) =>
              handleChange({
                stations: e.target.value.split(",").map((s) => s.trim()),
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CityBikeConfiguration;
