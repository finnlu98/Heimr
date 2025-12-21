import { useEffect, useState } from "react";
import CityBikeFetcher from "../../api/city-bike-fetcher";
import { Station } from "../../model/CityBikeResponse";
import "./city-bike.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { useDashboard } from "../../../../dashboard/dashboard-context";
import { WidgetEnum } from "../../../model/widget-type";
import { CityBikeConfig } from "../../CityBikeWidget";

const homeIcon = L.divIcon({
  className: "home-label-icon",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const CityBike: React.FC = () => {
  const [cityBikes, setCityBikes] = useState<Map<number, Station>>();
  const { widgetConfigs } = useDashboard();
  const cityBikeConfig = widgetConfigs[WidgetEnum.cityBike] as CityBikeConfig;

  useEffect(() => {
    const setAndFetchBikes = async () =>
      setCityBikes(await CityBikeFetcher(cityBikeConfig.stations));
    setAndFetchBikes();
  }, []);

  useEffect(() => {
    const updateInterval = setInterval(
      () => {
        updateBikeData();
      },
      15 * 5 * 1000,
    );

    return () => clearInterval(updateInterval);
  }, []);

  async function updateBikeData() {
    try {
      const updatedCityData = await CityBikeFetcher(cityBikeConfig.stations);
      setCityBikes(updatedCityData);
    } catch (error) {
      console.error("Can't update data:", error);
    }
  }

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
    <div className="city-bikes-container">
      <div className="widget-title">
        <div>Available city bikes</div>
        <img
          className="header-icon"
          src="./img/city-bike/bicycle-parking.png"
          alt="bicycle"
        ></img>
      </div>
      <div className="map">
        <MapContainer
          className="map-component"
          center={[
            Number(cityBikeConfig.centerCoordinates.lat),
            Number(cityBikeConfig.centerCoordinates.lon),
          ]}
          zoom={cityBikeConfig.zoom}
          scrollWheelZoom={false}
          zoomControl={false}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" />
          <Marker
            position={[
              Number(cityBikeConfig.homeCoordinates.lat),
              Number(cityBikeConfig.homeCoordinates.lon),
            ]}
            icon={homeIcon}
          />

          {cityBikes &&
            Array.from(cityBikes.entries()).map(([key, entry]) => (
              <Marker
                key={key}
                position={[Number(entry.lat), Number(entry.lon)]}
                icon={formatMarker(entry.num_bikes_available)}
              ></Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default CityBike;
