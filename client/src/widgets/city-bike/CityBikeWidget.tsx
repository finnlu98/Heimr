import { GrBike } from "react-icons/gr";
import CityBike from "./components/card/city-bike";
import CityBikeConfiguration from "./components/configuration/cityBikeConfiguration";
import DocumentationBase from "../core/components/DocumentationBase";
import { WidgetDefinition, WidgetEnum } from "../core/model/widget-type";
import { CityBikeData } from "./model/CityBikeData";
import { useMappedStatusQuery } from "./hook/city-bike-hook";

const CityBikeDocumentation = () => (
  <DocumentationBase
    provider="Oslo City Bike"
    generalDocumentation="<p>The City Bike widget displays real-time information about available city bikes at various stations in your selected area. Stay updated on bike availability and plan your rides accordingly.</p>"
    dataUpdateInterval="3 minutes"
  />
);

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
