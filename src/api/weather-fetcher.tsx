import axios from "axios";
import configuration from "../Configuration";
import { WeatherResponse } from "../model/Deziarilize/WeatherResponse";
import { WeatherForecast } from "../model/data/WeatherForecast";
import { SunriseResponse } from "../model/Deziarilize/SunriseResponse";
import { WeatherData } from "../model/data/WeatherData";

const FetchWeatherAndSunset = async () => {
    const geoLocator = navigator.geolocation;

    if(!geoLocator)
        return;

    var pos = await getCurrentPosition();
    var weatherEndpoint = formatEndpointWithCoordinates(configuration.getWeatherEndpoint(), pos);
    var sunriseEndpoint = formatEndpointWithCoordinates(configuration.getSunriseEndpoint(), pos);
    

    const weatherRes = await axios.get<WeatherResponse>(weatherEndpoint)
    const sunriseRes = await axios.get<SunriseResponse>(sunriseEndpoint)
    const weatherForecast = new WeatherForecast(weatherRes.data)

    return new WeatherData(weatherForecast, sunriseRes.data)
}

function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function formatEndpointWithCoordinates(endpoint: string, pos: GeolocationPosition) : string {
    return endpoint
            .replace(":lat", pos.coords.latitude.toString())
            .replace(":lon", pos.coords.longitude.toString())
}

export default FetchWeatherAndSunset;