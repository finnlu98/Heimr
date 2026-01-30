import { FaHeading } from "react-icons/fa";
import { WidgetDefinition, WidgetEnum } from "../widgets/model/widget-type";
import Header from "./header";

export const HeaderWidget: WidgetDefinition<HeaderConfig> = {
  id: WidgetEnum.header,
  friendlyName: "Header",
  widgetIcon: <FaHeading />,
  widgetComponent: <Header />,
  defaultColSpan: 24,
  defaultRowSpan: 3,
  defaultWidgetStyling: false,
};

export interface HeaderConfig {}
