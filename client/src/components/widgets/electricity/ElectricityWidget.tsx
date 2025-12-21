import { WidgetDefinition, WidgetEnum } from "../model/widget-type";
import { ImPower } from "react-icons/im";
import ElectricyConsumption from "./components/electricity-consumption/electricity-consumption";
import ElectricityConfiguration from "./components/configuration/electricity-configuration";

export const ElectricityWidget: WidgetDefinition<ElectricityConfig> = {
  id: WidgetEnum.electricity,
  friendlyName: "Electricity",
  widgetIcon: <ImPower />,
  widgetComponent: <ElectricyConsumption />,
  widgetConfig: {
    component: <ElectricityConfiguration />,
  },
  defaultColSpan: 10,
  defaultRowSpan: 6,
};

export interface ElectricityConfig {
  electricityKey: string;
}
