import axios from "axios";
import configuration from "../Configuration";
import { WeatherResponse } from "../model/Deziarilize/WeatherResponse";
import { WeatherForecast } from "../model/data/WeatherForecast";
import { SunriseResponse } from "../model/Deziarilize/SunriseResponse";
import { WeatherData } from "../model/data/WeatherData";

import FetcherHelper from "./fetcher/FetcherHelper";

const FetchWeatherAndSunset = async () => {
    const geoLocator = navigator.geolocation;

    if(!geoLocator)
        return;
      
    // temp solution
    // var pos = await getCurrentPosition();
    var weatherEndpoint = formatEndpointWithCoordinates(configuration.getWeatherEndpoint());
    var sunriseEndpoint = formatEndpointWithCoordinates(configuration.getSunriseEndpoint());

    const weatherFetcher = new FetcherHelper<WeatherResponse>(60 * 50 * 1000)
    const weatherRes = await weatherFetcher.getData(WeatherResponse.Identifier, async () => (await axios.get<WeatherResponse>(weatherEndpoint)).data)
    const weatherForecast = new WeatherForecast(weatherRes)

    const sunriseFetcher = new FetcherHelper<SunriseResponse>(60 * 60 * 24 * 1000)
    const sunriseRes = await sunriseFetcher.getData(SunriseResponse.Identifier, async () => (await axios.get<SunriseResponse>(sunriseEndpoint)).data) 


    return new WeatherData(weatherForecast, sunriseRes)
}

function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// Todo: fix https tunneling on local network
function formatEndpointWithCoordinates(endpoint: string) : string {
    return endpoint
            .replace(":lat", "59.91273")
            .replace(":lon", "10.74609")
}

export default FetchWeatherAndSunset;