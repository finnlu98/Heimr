import axios from "axios";
import configuration from "../Configuration";
import { WeatherResponse } from "../model/Deziarilize/WeatherResponse";
import { WeatherForecast } from "../model/data/WeatherForecast";

const FetchWeather = async () => {
    const geoLocator = navigator.geolocation;

    if(!geoLocator)
        return;

    var pos = await getCurrentPosition();
    var endpoint = configuration.getWeatherEndpoint()
                    .replace(":lat", pos.coords.latitude.toString())
                    .replace(":lon", pos.coords.longitude.toString())

    const res = await axios.get<WeatherResponse>(endpoint)
    const weatherForecast = new WeatherForecast(res.data)


    return weatherForecast
}

function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export default FetchWeather;