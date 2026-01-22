import { WidgetDefinition } from "../model/widget-type";
import { WidgetEnum } from "../model/widget-type";
import { GrBike } from "react-icons/gr";
import CityBike from "./components/card/city-bike";
import CityBikeConfiguration from "./components/configuration/cityBikeConfiguration";

export const CityBikeWidget: WidgetDefinition<CityBikeConfig> = {
  id: WidgetEnum.cityBike,
  friendlyName: "City Bike",
  widgetIcon: <GrBike />,
  widgetComponent: <CityBike />,
  widgetConfig: { component: <CityBikeConfiguration /> },
  defaultColSpan: 4,
  defaultRowSpan: 4,
};

export interface CityBikeConfig {
  homeCoordinates: Coordinates;
  centerCoordinates: Coordinates;
  zoom: number;
  stations: string[];
}

export interface Coordinates {
  lat: number;
  lon: number;
}
