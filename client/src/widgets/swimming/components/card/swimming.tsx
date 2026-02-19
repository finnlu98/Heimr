import { FaThermometerEmpty, FaThermometerFull } from "react-icons/fa";
import LoadingHelperWidget from "../../../core/components/LoadingHelperWidget";
import { WidgetEnum } from "../../../core/model/widget-type";
import { SwimmingResponse } from "../../model/swimming-response";
import "./swimming.css";

interface SwimmingProps {
  data?: SwimmingResponse[];
}

const Swimming: React.FC<SwimmingProps> = ({ data }) => {
  const getTemperatureClass = (temp: number | null): string => {
    if (temp === null) return "";
    if (temp < 15) return "cold";
    if (temp >= 15 && temp < 22) return "warm";
    return "hot";
  };

  const getAverageTemperature = (): number | null => {
    if (!data || data.length === 0) return null;
    const totalTemp = data.reduce((sum, location) => sum + location.temperature, 0);
    return totalTemp / data.length;
  };

  const avgTemperature = getAverageTemperature();

  return (
    <LoadingHelperWidget widgetKey={WidgetEnum.swimming} showConfig={() => !data} loadingKeys={["swimming"]}>
      <div className="fill-width h-column widget-overflow">
        <div className="widget-title h-column">
          <span>Swimming temperatures 🏊🏻‍♂️</span>
          <span className="h-row font-small">
            <span>Avg in your area:</span>
            <span className={`${getTemperatureClass(avgTemperature)}`}>
              {avgTemperature !== null ? `${avgTemperature.toFixed(2)}°C` : ""}
            </span>
          </span>
        </div>
        {data && data.length > 0 ? (
          data.map((location) => (
            <div key={location.locationId}>
              <div className="swimming-row h-row standard-rows">
                <div className="h-row">
                  <span>📍</span>

                  <div className="h-column">
                    <strong>
                      <span>{location.locationName}</span>
                    </strong>
                    <div className="font-small">
                      <span>{Number((location.distanceFromLocation / 1000).toFixed(2))} km</span>
                    </div>
                  </div>
                </div>
                <div className={`h-row ${getTemperatureClass(location.temperature)}`}>
                  <span>{location.temperature}°C</span>
                  <span>
                    <FaThermometerFull />
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="swimming-empty">No swimming locations available</div>
        )}
      </div>
    </LoadingHelperWidget>
  );
};

export default Swimming;
