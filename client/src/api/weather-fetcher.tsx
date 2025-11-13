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

    // temp solution
    // var pos = await getCurrentPosition();
    var weatherEndpoint = formatEndpointWithCoordinates(configuration.getWeatherEndpoint());
    var sunriseEndpoint = formatEndpointWithCoordinates(configuration.getSunriseEndpoint());
    

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

// Todo: fix https tunneling on local network
function formatEndpointWithCoordinates(endpoint: string) : string {
    return endpoint
            .replace(":lat", "59.91273")
            .replace(":lon", "10.74609")
}

export default FetchWeatherAndSunset;