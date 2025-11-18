import axios from "axios";
import configuration from "../Configuration";
import FetcherHelper from "./fetcher/FetcherHelper";
import { CityBikeStationResponse } from "../model/Deziarilize/CityBike/CityBikeStationsResponse";
import { CityBikeStatusResponse } from "../model/Deziarilize/CityBike/CityBikeStatusResponse";
import { Station } from "../model/Deziarilize/CityBike/CityBikeResponse";

const CityBikeFetcher = async () => {
    try {
        const cityBikeConfig = configuration.getOsloCityBikeConfig()
        const identifier = configuration.getIdentifierConfig()

        const stationEndpoint = cityBikeConfig.StationsInformation.Endpoint;
        const stationFetcher = new FetcherHelper<CityBikeStationResponse>(60 * 60 * 24 * 7 * 1000) // Once a week
        const stationsRes = await stationFetcher.getData(CityBikeStationResponse.Identifier, async () => {
             var res = await axios.get<CityBikeStationResponse>(stationEndpoint, { headers: { "Client-Identifier": identifier } })
            return res.data
        })  

        const statusEndpoint = cityBikeConfig.Status.Endpoint;
        const statusFetcher = new FetcherHelper<CityBikeStatusResponse>(60 * 3 * 1000)
        const statusRes = await statusFetcher.getData(CityBikeStatusResponse.Identifier, async () => {
            var res = await axios.get<CityBikeStatusResponse>(statusEndpoint, { headers: { "Client-Identifier": identifier } })
            return res.data
        })

        const keepIds = new Set(cityBikeConfig.Stations.map(s => s.StationId));
        const filteredStations = stationsRes.data.stations.filter(station => keepIds.has(Number(station.station_id)));
        const filteredStatus = statusRes.data.stations.filter(station => keepIds.has(Number(station.station_id)));
        
        const stationMap = new Map<number, Station>(filteredStations.map(s => [Number(s.station_id), s]))

        filteredStatus.forEach(status => {
            const id = Number(status.station_id);
            const station = stationMap.get(id);
            if(station) {
                station.last_reported = status.last_reported
                station.num_bikes_available = status.num_bikes_available
                stationMap.set(id, station)
            }
        });
        return stationMap;

    } catch (error) {
        console.error("Can`t get City Bike data")
        throw error;
    }
}

export default CityBikeFetcher