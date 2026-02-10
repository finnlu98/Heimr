import "./travel-card-configuration.css";
import { useDashboard } from "../../../../core/dashboard/dashboard-context";
import { TravelCardConfig, TravelRoute } from "../../TravelCardWidget";
import { IoAddCircle } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Fragment, useRef, useState } from "react";
import UploadImageCircle from "../../../../core/shared/imageCirlce/UploadImageCircle";
import SearchStop, { SearchStopHandle } from "./SearchStop";
import { TravelStop } from "../../model/StopSearchResponse";
import { TiArrowRightOutline } from "react-icons/ti";
import { TripIdentifier } from "../../model/enum/TripIdentifier";
import { WidgetEnum } from "../../../core/model/widget-type";

const defaultConfig = { numRows: 3, minFilter: 3 };
const defaultColors = { general: 10, green: 7, yellow: 5 };

const TravelCardConfiguration: React.FC = () => {
  const { widgetConfigs, setWidgetConfig } = useDashboard();
  const config = (widgetConfigs[WidgetEnum.busCards] as TravelCardConfig) ?? {
    travelRoutes: [],
    tripIdentifier: TripIdentifier.title,
  };
  const [travelRoute, setTravelRoute] = useState<TravelRoute>({
    imgIdentifier: "",
    startPlace: { geometry: { coordinates: [0, 0] }, properties: { id: "", label: "", name: "", county: "" } },
    stopPlace: { geometry: { coordinates: [0, 0] }, properties: { id: "", label: "", name: "", county: "" } },
    configCard: defaultConfig,
    configColor: defaultColors,
  });
  const [travelIdentifier, setTravelIdentifier] = useState<TripIdentifier>(config.tripIdentifier);
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

  function onUpdateImage(dataUrl: string | null, startPlace: TravelStop, stopPlace: TravelStop) {
    if (!dataUrl) return;
    setWidgetConfig(WidgetEnum.busCards, {
      ...config,
      travelRoutes: config.travelRoutes.map((route) => {
        if (route.startPlace === startPlace && route.stopPlace === stopPlace) {
          return {
            ...route,
            imgIdentifier: dataUrl,
          };
        }
        return route;
      }),
    });
  }

  function onSetTravelIdentifier(identifier: TripIdentifier) {
    setTravelIdentifier(identifier);
    setWidgetConfig(WidgetEnum.busCards, {
      ...config,
      tripIdentifier: identifier,
    });
  }

  return (
    <div className="travel-config-container h-column gap-large">
      <div className="h-row gap-large">
        <label className="standard-row">Select trip identifier:</label>
        <label className="h-row">
          Title
          <input
            type="radio"
            name="title"
            value="title"
            checked={travelIdentifier === TripIdentifier.title}
            onChange={() => onSetTravelIdentifier(TripIdentifier.title)}
          />
        </label>
        <label className="h-row">
          Image
          <input
            type="radio"
            name="image"
            value="image"
            checked={travelIdentifier === TripIdentifier.img}
            onChange={() => onSetTravelIdentifier(TripIdentifier.img)}
          />
        </label>
      </div>
      <div className="travel-config">
        {config &&
          config.travelRoutes.map((route) => {
            return (
              <Fragment key={`${route.startPlace.properties.id}-${route.stopPlace.properties.id}`}>
                <div>
                  {travelIdentifier === TripIdentifier.img && (
                    <UploadImageCircle
                      onImageChange={(dataUrl) => onUpdateImage(dataUrl, route.startPlace, route.stopPlace)}
                      imgPath={route.imgIdentifier}
                    />
                  )}
                </div>
                <div>{route.startPlace.properties.name}</div>
                <p>
                  <TiArrowRightOutline />
                </p>
                <div> {route.stopPlace.properties.name}</div>
                <div
                  className="travel-action-button"
                  onClick={() => removeTravelRoute(route.startPlace, route.stopPlace)}
                >
                  <MdDelete size={20} />
                </div>
              </Fragment>
            );
          })}
        <div>
          {travelIdentifier === TripIdentifier.img && (
            <UploadImageCircle onImageChange={onImageChange} imgPath={travelRoute.imgIdentifier} />
          )}
        </div>
        <div className="search-input">
          <SearchStop
            onStopSelect={(stop) => setTravelRoute((prev) => ({ ...prev, startPlace: stop }))}
            placeholder="Start stop"
            ref={startStopRef}
          />
        </div>

        <p>
          <TiArrowRightOutline />
        </p>
        <div className="search-input">
          <SearchStop
            onStopSelect={(stop) => setTravelRoute((prev) => ({ ...prev, stopPlace: stop }))}
            placeholder="End stop"
            ref={endStopRef}
          />
        </div>
        <div className="travel-action-button" onClick={() => addTravelRoute(travelRoute)}>
          <IoAddCircle size={20} />
        </div>
      </div>
    </div>
  );
};

export default TravelCardConfiguration;
