import { WidgetDefinition, WidgetEnum } from "../model/widget-type";
import { BiSolidBus } from "react-icons/bi";
import TravelCard from "./components/card/travel-card";
import TravelCardConfiguration from "./components/configuration/travel-card-configuration";

export const TravelCardWidget: WidgetDefinition<TravelCardConfig> = {
  id: WidgetEnum.busCards,
  friendlyName: "Travel",
  widgetIcon: <BiSolidBus />,
  widgetComponent: <TravelCard />,
  widgetConfig: {
    component: <TravelCardConfiguration />,
    config: {
      travelRoutes: []
    }
  },
  defaultColSpan: 6,
  defaultRowSpan: 6,
};

export interface TravelCardConfig {
  travelRoutes: TravelRoute[];
}

export interface TravelRoute {
  imgIdentifier: string;
  startPlace: string;
  stopPlace: string;
  configCard: ConfigCard;
  configColor: ConfigColor
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