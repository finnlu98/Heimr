import { FaSwimmingPool } from "react-icons/fa";
import { WidgetDefinition, WidgetEnum } from "../core/model/widget-type";
import { SwimmingResponse } from "./model/swimming-response";
import { Coordinate } from "../../model/Coordinate";
import Swimming from "./components/card/swimming";
import { useSwimmingQuery } from "./hook/swimming-hook";
import SwimmingConfiguration from "./components/configuration/swimming-configuration";
import { Address } from "../../model/Adress";

export const SwimmingWidget: WidgetDefinition<SwimmingConfig, SwimmingResponse[]> = {
  id: WidgetEnum.swimming,
  friendlyName: "Swimming",
  widgetIcon: <FaSwimmingPool />,
  widgetComponent: Swimming,
  useQuery: useSwimmingQuery,
  widgetConfig: {
    component: SwimmingConfiguration,
  },
  defaultColSpan: 0,
  defaultRowSpan: 0,
};

export interface SwimmingConfig {
  searchLocation: Address;
}
