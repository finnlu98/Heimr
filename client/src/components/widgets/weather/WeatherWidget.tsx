import { WidgetDefinition, WidgetEnum } from "../model/widget-type";
import { TiWeatherSunny } from "react-icons/ti";
import Dailyweather from "./components/card/daily-weather";
import WeatherConfiguration from "./components/configuration/weatherConfiguration";

export const WeatherWidget: WidgetDefinition<WeatherConfig> = {
  id: WidgetEnum.weather,
  friendlyName: "Weather",
  widgetIcon: <TiWeatherSunny />,
  widgetComponent: <Dailyweather />,
  widgetConfig: {
    component: <WeatherConfiguration />,
  },
  defaultColSpan: 10,
  defaultRowSpan: 6,
};

export interface WeatherConfig {
  lat: string;
  lon: string;
}
