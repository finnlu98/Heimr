import configuration from "../../../../Configuration";
import FetcherHelper from "../../../../api/FetcherHelper";
import { CityBikeStationResponse } from "../model/CityBikeStationsResponse";
import { CityBikeStatusResponse } from "../model/CityBikeStatusResponse";
import externalApiClient from "../../../../api/ExternalApiClient";

const CityBikeStatusFetcher = async () => {
  try {
    const cityBikeConfig = configuration.getOsloCityBikeConfig();
    const identifier = configuration.getIdentifierConfig();

    const statusEndpoint = cityBikeConfig.Status.Endpoint;
    const statusFetcher = new FetcherHelper<CityBikeStatusResponse>(60 * 3 * 1000);
    const statusRes = await statusFetcher.getData(CityBikeStatusResponse.Identifier, async () => {
      var res = await externalApiClient.get<CityBikeStatusResponse>(statusEndpoint, {
        headers: { "Client-Identifier": identifier },
        meta: { loadingKey: "fetch-city-bike-status" },
      });
      return res.data;
    });

    return statusRes;
    
  } catch (error) {
    console.error("Can`t get City Bike data");
    throw error;
  }
};

export const CityBikeStationsFetcher = async () => {
  try {
    const cityBikeConfig = configuration.getOsloCityBikeConfig();
    const identifier = configuration.getIdentifierConfig();

    const stationEndpoint = cityBikeConfig.StationsInformation.Endpoint;
    const stationFetcher = new FetcherHelper<CityBikeStationResponse>(60 * 60 * 24 * 7 * 1000); // Once a week
    const stationsRes = await stationFetcher.getData(CityBikeStationResponse.Identifier, async () => {
      var res = await externalApiClient.get<CityBikeStationResponse>(stationEndpoint, {
        headers: { "Client-Identifier": identifier },
        meta: { loadingKey: "fetch-city-bike-stations" },
      });
      return res.data;
    });
    return stationsRes;
  } catch (error) {
    console.error("Can`t get City Bike stations data");
    throw error;
  }
};

export default CityBikeStatusFetcher;
