import { TiWeatherSunny } from "react-icons/ti";
import Dailyweather from "./components/card/daily-weather";
import WeatherConfiguration from "./components/configuration/weatherConfiguration";
import DocumentationBase from "../core/components/DocumentationBase";
import { useWeatherQuery } from "./hooks/useWeatherQuery";
import { WidgetDefinition, WidgetEnum } from "../core/model/widget-type";
import { WeatherData } from "./model/data/WeatherData";

const WeatherDocumentation = () => (
  <DocumentationBase
    imgPaths={["./img/integrations/met_logo.jpg", "./img/integrations/yr_logo.svg"]}
    provider="met.no"
    dataUpdateInterval="60 minutes"
    generalDocumentation="<p>The Weather widget provides up-to-date weather information for your specified adress.</p>"
  />
);

export const WeatherWidget: WidgetDefinition<WeatherConfig, WeatherData> = {
  id: WidgetEnum.weather,
  friendlyName: "Weather",
  widgetIcon: <TiWeatherSunny />,
  widgetComponent: Dailyweather,
  useQuery: useWeatherQuery,
  widgetConfig: {
    component: WeatherConfiguration,
    documentation: WeatherDocumentation,
  },
  defaultColSpan: 12,
  defaultRowSpan: 6,
};

export interface WeatherConfig {
  lat: string;
  lon: string;
}
