import { BiSolidBus } from "react-icons/bi";
import TravelCard from "./components/card/travel-card";
import TravelCardConfiguration from "./components/configuration/travel-card-configuration";
import { TravelStop } from "./model/StopSearchResponse";
import DocumentationBase from "../core/components/DocumentationBase";
import { TripIdentifier } from "./model/enum/TripIdentifier";
import { WidgetDefinition, WidgetEnum } from "../core/model/widget-type";
import { BusData } from "./model/BusData";
import { useBusQueries } from "./hooks/bus-hook";

const TravelDocumentation = () => (
  <DocumentationBase
    imgPaths={["./img/integrations/entur_logo.svg"]}
    generalDocumentation="<p>The Travel Card widget provides real-time information about your selected travel routes, including departure times and delays. Stay informed and plan your journeys effectively with up-to-date transit data.</p>"
    dataUpdateInterval="7 minutes"
  />
);

export const TravelCardWidget: WidgetDefinition<TravelCardConfig, BusData[]> = {
  id: WidgetEnum.busCards,
  friendlyName: "Travel",
  widgetIcon: <BiSolidBus />,
  useQuery: useBusQueries,
  widgetComponent: TravelCard,
  widgetConfig: {
    component: TravelCardConfiguration,
    documentation: TravelDocumentation,
  },
  defaultColSpan: 12,
  defaultRowSpan: 8,
};

export interface TravelCardConfig {
  tripIdentifier: TripIdentifier;
  travelRoutes: TravelRoute[];
}

export interface TravelRoute {
  imgIdentifier: string;
  startPlace: TravelStop;
  stopPlace: TravelStop;
  configCard: ConfigCard;
  configColor: ConfigColor;
}

interface ConfigColor {
  general: number;
  green: number;
  yellow: number;
}

interface ConfigCard {
  numRows: number;
  minFilter: number;
}
