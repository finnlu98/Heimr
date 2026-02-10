import { ImPower } from "react-icons/im";
import ElectricyConsumption from "./components/electricity-consumption/electricity-consumption";
import ElectricityConfiguration from "./components/configuration/electricity-configuration";
import DocumentationBase from "../core/components/DocumentationBase";
import { WidgetDefinition, WidgetEnum } from "../core/model/widget-type";
import { useElviaConsumptionQuery } from "./hook/electricity-hook";
import { ElectricityData } from "./model/ElectricityData";
import ElectricityDocumentation from "./components/documentation/electricity-documentation";

export const ElectricityWidget: WidgetDefinition<ElectricityConfig, ElectricityData> = {
  id: WidgetEnum.electricity,
  friendlyName: "Electricity",
  widgetIcon: <ImPower />,
  useQuery: useElviaConsumptionQuery,
  widgetComponent: ElectricyConsumption,
  widgetConfig: {
    component: ElectricityConfiguration,
    documentation: ElectricityDocumentation,
  },
  defaultColSpan: 12,
  defaultRowSpan: 6,
  fetchtingInterval: 60 * 60 * 1000,
};

export interface ElectricityConfig {}
