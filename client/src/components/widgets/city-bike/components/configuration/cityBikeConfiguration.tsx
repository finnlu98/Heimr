import { FaRegSave } from "react-icons/fa";
import { useDashboard } from "../../../../dashboard/dashboard-context";
import { CityBikeConfig } from "../../CityBikeWidget";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents, ZoomControl } from "react-leaflet";
import L from "leaflet";
import { useCityBike } from "../../context/CityBikeContext";
import AdressSearch from "../../../../shared/adressSearch/AdressSearch";
import { useAuth } from "../../../../../context/AuthContext";
import { Address } from "../../../../../model/Adress";
import "./cityBikeConfiguration.css";
import { WidgetEnum } from "../../../core/model/widget-type";

const CityBikeConfiguration: React.FC = () => {
  const { widgetConfigs, setWidgetConfig } = useDashboard();
  const { cityStations, setClosestStations } = useCityBike();
  const { home } = useAuth();

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
    const map = useMap();
    useEffect(() => {
      map.setView(
        [Number(localConfig.centerCoordinates.lat), Number(localConfig.centerCoordinates.lon)],
        localConfig.zoom ?? 13,
      );
    }, [localConfig.centerCoordinates.lat, localConfig.centerCoordinates.lon, map]);

    useMapEvents({
      moveend: (e) => {
        const center = e.target.getCenter();
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

  function onAddressSelect(address: Address) {
    handleChange({ homeCoordinates: address.coordinate, centerCoordinates: address.coordinate });
    setClosestStations(address.coordinate);
  }

  const saveConfig = () => {
    setWidgetConfig(WidgetEnum.cityBike, localConfig);
  };
  return (
    <div className="city-bike-configuration h-column">
      <div className="h-column">
        <label htmlFor="homeId">Home address:</label>
        <AdressSearch onAddressSelect={onAddressSelect} />
      </div>
      <div className="map">
        <MapContainer
          key={`map-config`}
          className="map-component"
          center={[Number(localConfig.centerCoordinates.lat), Number(localConfig.centerCoordinates.lon)]}
          zoom={localConfig?.zoom ?? 13}
          zoomControl={false}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" />
          <ZoomControl position="bottomright" />
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
      <div className="justify-end">
        <button onClick={saveConfig}>
          Save <FaRegSave />
        </button>
      </div>
    </div>
  );
};

export default CityBikeConfiguration;
