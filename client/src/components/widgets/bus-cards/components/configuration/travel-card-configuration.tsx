import "./travel-card-configuration.css";
import { useDashboard } from "../../../../dashboard/dashboard-context";
import { TravelCardConfig, TravelRoute } from "../../TravelCardWidget";
import { WidgetEnum } from "../../../model/widget-type";
import { IoAddCircle } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useRef, useState } from "react";
import ImageCircle from "../../../../shared/imageCirlce/ImageCircle";
import UploadImageCircle from "../../../../shared/imageCirlce/UploadImageCircle";
import SearchStop, { SearchStopHandle } from "./SearchStop";
import { TravelStop } from "../../model/StopSearchResponse";

const defaultConfig = { numRows: 3, minFilter: 3 };
const defaultColors = { general: 10, green: 7, yellow: 5 };

const TravelCardConfiguration: React.FC = () => {
  const { widgetConfigs, setWidgetConfig } = useDashboard();
  const config = (widgetConfigs[WidgetEnum.busCards] as TravelCardConfig) ?? {
    travelRoutes: [],
  };
  const [travelRoute, setTravelRoute] = useState<TravelRoute>({
    imgIdentifier: "",
    startPlace: { geometry: { coordinates: [0, 0] }, properties: { id: "", label: "", name: "", county: "" } },
    stopPlace: { geometry: { coordinates: [0, 0] }, properties: { id: "", label: "", name: "", county: "" } },
    configCard: defaultConfig,
    configColor: defaultColors,
  });
  const startStopRef = useRef<SearchStopHandle>(null);
  const endStopRef = useRef<SearchStopHandle>(null);

  function removeTravelRoute(startPlace: TravelStop, stopPlace: TravelStop) {
    var updatedRoutes = config.travelRoutes.filter((t) => t.startPlace !== startPlace && t.stopPlace !== stopPlace);
    var updatedConfig = {
      ...config,
      travelRoutes: updatedRoutes,
    };

    setWidgetConfig(WidgetEnum.busCards, updatedConfig);
  }

  function addTravelRoute(travelRoute: TravelRoute) {
    const updatedConfig = {
      ...config,
      travelRoutes: [...config.travelRoutes, travelRoute],
    };

    setWidgetConfig(WidgetEnum.busCards, updatedConfig);
    setTravelRoute({
      imgIdentifier: "",
      startPlace: { geometry: { coordinates: [0, 0] }, properties: { id: "", label: "", name: "", county: "" } },
      stopPlace: { geometry: { coordinates: [0, 0] }, properties: { id: "", label: "", name: "", county: "" } },
      configCard: defaultConfig,
      configColor: defaultColors,
    });
    startStopRef.current?.clear();
    endStopRef.current?.clear();
  }

  function onImageChange(dataUrl: string | null, file: File | null) {
    if (!dataUrl) return;
    setTravelRoute((prev) => {
      return {
        ...prev,
        imgIdentifier: dataUrl,
      };
    });
  }

  return (
    <div className="travel-config">
      <div className="travel-header"></div>
      <div className="travel-header">Start stop</div>
      <div className="travel-header">End stop</div>
      <div></div>

      {config &&
        config.travelRoutes.map((route) => {
          return (
            <>
              <div>
                <ImageCircle imgPath={route.imgIdentifier} alt="prev-img" />{" "}
              </div>
              <div>{route.startPlace.properties.name}</div>
              <div> {route.stopPlace.properties.name}</div>
              <div
                className="travel-action-button"
                onClick={() => removeTravelRoute(route.startPlace, route.stopPlace)}
              >
                <MdDelete size={20} />
              </div>
            </>
          );
        })}
      <UploadImageCircle onImageChange={onImageChange} imgPath={travelRoute.imgIdentifier} />
      <SearchStop
        onStopSelect={(stop) => setTravelRoute((prev) => ({ ...prev, startPlace: stop }))}
        placeholder="Start stop"
        ref={startStopRef}
      />

      <SearchStop
        onStopSelect={(stop) => setTravelRoute((prev) => ({ ...prev, stopPlace: stop }))}
        placeholder="End stop"
        ref={endStopRef}
      />
      <div className="travel-action-button" onClick={() => addTravelRoute(travelRoute)}>
        <IoAddCircle size={20} />
      </div>
    </div>
  );
};

export default TravelCardConfiguration;
