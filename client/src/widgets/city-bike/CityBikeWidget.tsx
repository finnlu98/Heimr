import { GrBike } from "react-icons/gr";
import CityBike from "./components/card/city-bike";
import CityBikeConfiguration from "./components/configuration/cityBikeConfiguration";
import DocumentationBase from "../core/components/DocumentationBase";
import { WidgetDefinition, WidgetEnum } from "../core/model/widget-type";
import { CityBikeData } from "./model/CityBikeData";
import { useMappedStatusQuery } from "./hook/city-bike-hook";
import CityBikeDocumentation from "./components/documentation/city-bike-documentation";

export const CityBikeWidget: WidgetDefinition<CityBikeConfig, CityBikeData> = {
  id: WidgetEnum.cityBike,
  friendlyName: "City Bike",
  widgetIcon: <GrBike />,
  useQuery: useMappedStatusQuery,
  widgetComponent: CityBike,
  widgetConfig: {
    component: CityBikeConfiguration,
    documentation: CityBikeDocumentation,
  },
  defaultColSpan: 8,
  defaultRowSpan: 8,
  fetchtingInterval: 3 * 60 * 1000,
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
