import { FaRegSave } from "react-icons/fa";
import { useDashboard } from "../../../../core/dashboard/dashboard-context";
import { WeatherConfig } from "../../WeatherWidget";
import { useState } from "react";
import AdressSearch from "../../../../core/shared/adressSearch/AdressSearch";
import { Address } from "../../../../model/Adress";
import { WidgetEnum } from "../../../core/model/widget-type";

const WeatherConfiguration: React.FC = () => {
  const { widgetConfigs, setWidgetConfig } = useDashboard();
  const config = (widgetConfigs[WidgetEnum.weather] as WeatherConfig) ?? {
    lat: "",
    lon: "",
  };

  const [coordinate, setCoordinate] = useState({ lat: config.lat || "", lon: config.lon || "" });

  const saveConfig = () => {
    setWidgetConfig(WidgetEnum.weather, {
      lat: coordinate.lat,
      lon: coordinate.lon,
    });
  };

  function handleAddressSelect(address: Address) {
    setCoordinate({
      lat: address.coordinate.lat.toString(),
      lon: address.coordinate.lon.toString(),
    });
  }

  return (
    <div className="h-column">
      <label htmlFor="lon">Weather location:</label>
      <div className="h-row">
        <AdressSearch onAddressSelect={handleAddressSelect} />
        <button onClick={saveConfig}>
          <div className="h-row">
            Save <FaRegSave />
          </div>
        </button>
      </div>
    </div>
  );
};
export default WeatherConfiguration;
