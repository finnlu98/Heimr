import "./city-bike.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { useDashboard } from "../../../../dashboard/dashboard-context";
import { CityBikeConfig } from "../../CityBikeWidget";
import { useCityBike } from "../../context/CityBikeContext";
import LoadingHelperWidget from "../../../core/components/LoadingHelperWidget";
import { WidgetEnum } from "../../../core/model/widget-type";

const homeIcon = L.divIcon({
  className: "home-label-icon",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const CityBike: React.FC = () => {
  const { cityBikeData } = useCityBike();
  const { widgetConfigs } = useDashboard();
  const cityBikeConfig = widgetConfigs[WidgetEnum.cityBike] as CityBikeConfig;

  function formatMarker(available: number) {
    var formattedClass = "bike-label";

    if (available === 0) formattedClass += " empty";

    return L.divIcon({
      className: "bike-label-icon",
      html: `<div class="${formattedClass}">${available}</div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
    });
  }

  return (
    <LoadingHelperWidget
      widgetKey={WidgetEnum.cityBike}
      loadingKeys={["fetch-city-bike-status", "fetch-city-bike-stations"]}
      showConfig={() => !cityBikeConfig || !cityBikeData}
    >
      {cityBikeConfig && (
        <div className="city-bikes-container">
          <div className="widget-title">
            <div>Available city bikes</div>
            <img className="header-icon" src="/img/city-bike/bicycle-parking.png" alt="bicycle"></img>
          </div>
          <div className="map">
            <MapContainer
              key={`${cityBikeConfig.centerCoordinates.lat}-${cityBikeConfig.centerCoordinates.lon}-${cityBikeConfig.zoom}`}
              className="map-component"
              center={[Number(cityBikeConfig.centerCoordinates.lat), Number(cityBikeConfig.centerCoordinates.lon)]}
              zoom={cityBikeConfig.zoom}
              zoomControl={false}
            >
              <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" />
              <Marker
                position={[Number(cityBikeConfig.homeCoordinates.lat), Number(cityBikeConfig.homeCoordinates.lon)]}
                icon={homeIcon}
              />
              {cityBikeData &&
                Array.from(cityBikeData.entries()).map(([key, entry]) => (
                  <Marker
                    key={key}
                    position={[Number(entry.lat), Number(entry.lon)]}
                    icon={formatMarker(entry.num_bikes_available)}
                  ></Marker>
                ))}
            </MapContainer>
          </div>
        </div>
      )}
    </LoadingHelperWidget>
  );
};

export default CityBike;
