import { useEffect, useState } from "react"
import CityBikeFetcher from "../../api/city-bike-fetcher"
import { Station } from "../../model/Deziarilize/CityBike/CityBikeResponse"
import "./city-bike.css"
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import configuration from "../../Configuration"
import L from "leaflet";

const homeIcon = L.divIcon({
            className: "home-label-icon",
            iconSize: [30, 30],
            iconAnchor: [15, 30],
            })

const CityBike: React.FC = () => {
    const [cityBikes, setCityBikes] = useState<Map<number, Station>>()

    useEffect(() => {
        const setAndFetchBikes = async () => setCityBikes(await CityBikeFetcher())
        setAndFetchBikes()
    }, [])

    useEffect(() => {
          const updateInterval = setInterval(() => {
            updateBikeData();
          }, 15 * 5 * 1000);
      
          return () => clearInterval(updateInterval);
        }, []);

    async function updateBikeData() {
        try {
            const updatedCityData = await CityBikeFetcher();
            setCityBikes(updatedCityData);
        } catch (error) {
             console.error("Can't update data:", error);
        }
    }

    function formatMarker(available: number) {
        
        var formattedClass = "bike-label";

        if(available == 0)
            formattedClass += " empty";

        return L.divIcon({
            className: "bike-label-icon",
            html: `<div class="${formattedClass}">${available}</div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 30],
        });
    }

    return (
        <div className="city-bikes-container">
            <div className="city-bikes-container-header">
                <div>Available city bikes</div>
                <img className="header-icon" src="./img/city-bike/bicycle-parking.png" alt="bicycle"></img>
            </div>
            <div className="map">
                <MapContainer className="map-component"
                    center={[59.920751379018874, 10.735538333840061]}
                    zoom={15}
                    scrollWheelZoom={false}
                    zoomControl={false}>
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" />
                            <Marker position={[configuration.getHomeConfig().lat, configuration.getHomeConfig().lon]} icon={homeIcon}/>
                    
                    {cityBikes &&
                        Array.from(cityBikes.entries()).map(([key, entry]) => (
                            <Marker key={key} position={[Number(entry.lat), Number(entry.lon)]} icon={formatMarker(entry.num_bikes_available)}>
                            </Marker>
                        ))
                    }
                </MapContainer>
            </div>
            

        </div>)
}

export default CityBike