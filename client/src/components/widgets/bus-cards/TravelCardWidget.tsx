import { WidgetDefinition, WidgetEnum } from "../model/widget-type";
import { BiSolidBus } from "react-icons/bi";
import TravelCard from "./components/card/travel-card";
import TravelCardConfiguration from "./components/configuration/travel-card-configuration";
import { TravelStop } from "./model/StopSearchResponse";

export const TravelCardWidget: WidgetDefinition<TravelCardConfig> = {
  id: WidgetEnum.busCards,
  friendlyName: "Travel",
  widgetIcon: <BiSolidBus />,
  widgetComponent: <TravelCard />,
  widgetConfig: {
    component: <TravelCardConfiguration />,
  },
  defaultColSpan: 6,
  defaultRowSpan: 6,
};

export interface TravelCardConfig {
  travelRoutes: TravelRoute[];
}

export interface TravelRoute {
  imgIdentifier: string;
  startPlace: TravelStop;
  stopPlace: TravelStop;
  configCard: ConfigCard;
  configColor: ConfigColor;
}

// export interface Stop {
//   id: string;
//   label: string;
//   name: string;
// }

interface ConfigColor {
  general: number;
  green: number;
  yellow: number;
}

interface ConfigCard {
  numRows: number;
  minFilter: number;
}
