import axios from "axios";
import configuration from "../../../../Configuration";
import { WeatherResponse } from "../model/response/WeatherResponse";
import { WeatherForecast } from "../model/data/WeatherForecast";
import { SunriseResponse } from "../model/response/SunriseResponse";
import { WeatherData } from "../model/data/WeatherData";

import FetcherHelper from "../../../../api/FetcherHelper";

const FetchWeatherAndSunset = async (lat: string, lon: string) => {
  var weatherEndpoint = formatEndpointWithCoordinates(
    configuration.getWeatherEndpoint(),
    lat,
    lon,
  );
  var sunriseEndpoint = formatEndpointWithCoordinates(
    configuration.getSunriseEndpoint(),
    lat,
    lon,
  );

  const weatherFetcher = new FetcherHelper<WeatherResponse>(60 * 50 * 1000);
  const weatherRes = await weatherFetcher.getData(
    WeatherResponse.Identifier,
    async () => (await axios.get<WeatherResponse>(weatherEndpoint)).data,
  );
  const weatherForecast = new WeatherForecast(weatherRes);

  const sunriseFetcher = new FetcherHelper<SunriseResponse>(
    60 * 60 * 24 * 1000,
  );
  const sunriseRes = await sunriseFetcher.getData(
    SunriseResponse.Identifier,
    async () => (await axios.get<SunriseResponse>(sunriseEndpoint)).data,
  );

  return new WeatherData(weatherForecast, sunriseRes);
};

function formatEndpointWithCoordinates(
  endpoint: string,
  lat: string,
  lon: string,
): string {
  return endpoint.replace(":lat", lat).replace(":lon", lon);
}

export default FetchWeatherAndSunset;
