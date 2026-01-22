import { FaRegSave } from "react-icons/fa";
import { useDashboard } from "../../../../dashboard/dashboard-context";
import { WidgetEnum } from "../../../model/widget-type";
import { CityBikeConfig } from "../../CityBikeWidget";
import { useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useCityBike } from "../../context/CityBikeContext";
import "./cityBikeConfiguration.css";

const CityBikeConfiguration: React.FC = () => {
  const { widgetConfigs, setWidgetConfig } = useDashboard();
  const { cityStations } = useCityBike();

  const config = (widgetConfigs[WidgetEnum.cityBike] as CityBikeConfig) ?? {
    homeCoordinates: { lat: 0, lon: 0 },
    centerCoordinates: { lat: 0, lon: 0 },
    zoom: 0,
    stations: [],
  };

  const [localConfig, setLocalConfig] = useState(config);

  const handleChange = (newConfig: Partial<CityBikeConfig>) => {
    setLocalConfig({
      ...localConfig,
      ...newConfig,
    });
  };

  const homeIcon = L.divIcon({
    className: "home-label-icon",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  const MapEventHandler = () => {
    useMapEvents({
      moveend: (e) => {
        const center = e.target.getCenter();
        console.log(localConfig);
        handleChange({
          centerCoordinates: {
            lat: center.lat.toString(),
            lon: center.lng.toString(),
          },
          zoom: e.target.getZoom(),
        });
      },
    });
    return null;
  };

  const handleStationClick = (stationId: string) => {
    const isSelected = localConfig.stations.includes(stationId);

    handleChange({
      stations: isSelected
        ? localConfig.stations.filter((id) => id !== stationId)
        : [...localConfig.stations, stationId],
    });
  };

  function formatMarker(stationId: string) {
    var selected = "☑️";

    if (localConfig.stations.includes(stationId)) selected = "✅";

    return L.divIcon({
      className: "bike-label-icon",
      html: `<div class="bike-label">${selected}</div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
    });
  }

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
                    lat: Number(e.target.value),
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
                    lon: Number(e.target.value),
                  },
                })
              }
            />
          </div>
        </div>
        <div className="map">
          <MapContainer
            key={`map-config`}
            className="map-component"
            center={[Number(localConfig.centerCoordinates.lat), Number(localConfig.centerCoordinates.lon)]}
            zoom={localConfig?.zoom ?? 13}
          >
            <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" />
            <MapEventHandler />
            <Marker
              position={[Number(localConfig.homeCoordinates.lat), Number(localConfig.homeCoordinates.lon)]}
              icon={homeIcon}
            />

            {cityStations &&
              cityStations.map((station) => (
                <Marker
                  key={station.station_id}
                  position={[station.lat, station.lon]}
                  icon={formatMarker(station.station_id)}
                  eventHandlers={{
                    click: () => handleStationClick(station.station_id),
                  }}
                />
              ))}
          </MapContainer>
        </div>
        <button onClick={saveConfig}>
          Save <FaRegSave />
        </button>
      </div>
    </div>
  );
};

export default CityBikeConfiguration;
