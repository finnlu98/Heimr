import { WidgetDefinition, WidgetEnum } from "../model/widget-type";
import { TiWeatherSunny } from "react-icons/ti";
import Dailyweather from "./components/card/daily-weather";
import WeatherConfiguration from "./components/configuration/weatherConfiguration";
import DocumentationBase from "../core/components/DocumentationBase";

export const WeatherWidget: WidgetDefinition<WeatherConfig> = {
  id: WidgetEnum.weather,
  friendlyName: "Weather",
  widgetIcon: <TiWeatherSunny />,
  widgetComponent: <Dailyweather />,
  widgetConfig: {
    component: <WeatherConfiguration />,
    documentation: (
      <DocumentationBase
        imgPaths={["./img/integrations/met_logo.jpg", "./img/integrations/yr_logo.svg"]}
        provider="met.no"
        dataUpdateInterval="60 minutes"
        generalDocumentation="<p>The Weather widget provides up-to-date weather information for your specified adress.</p>"
      />
    ),
  },
  defaultColSpan: 10,
  defaultRowSpan: 6,
};

export interface WeatherConfig {
  lat: string;
  lon: string;
}
