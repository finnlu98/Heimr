import { WidgetDefinition } from "../model/widget-type";
import { WidgetEnum } from "../model/widget-type";
import { GrBike } from "react-icons/gr";
import CityBike from "./components/card/city-bike";
import CityBikeConfiguration from "./components/configuration/cityBikeConfiguration";
import DocumentationBase from "../core/components/DocumentationBase";

export const CityBikeWidget: WidgetDefinition<CityBikeConfig> = {
  id: WidgetEnum.cityBike,
  friendlyName: "City Bike",
  widgetIcon: <GrBike />,
  widgetComponent: <CityBike />,
  widgetConfig: {
    component: <CityBikeConfiguration />,
    documentation: (
      <DocumentationBase
        provider="Oslo City Bike"
        generalDocumentation="<p>The City Bike widget displays real-time information about available city bikes at various stations in your selected area. Stay updated on bike availability and plan your rides accordingly.</p>"
        dataUpdateInterval="3 minutes"
      />
    ),
  },
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
