import { SunriseResponse } from "../response/SunriseResponse";
import { WeatherForecast } from "./WeatherForecast";

export class WeatherData {
    constructor(weatherForecast: WeatherForecast, sunriseData: SunriseResponse) {
        this.weatherForecast = weatherForecast;
        this.sunriseData = sunriseData; 
    }

    weatherForecast!: WeatherForecast
    sunriseData!: SunriseResponse
}