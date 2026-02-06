import { FaHeading } from "react-icons/fa";
import Header from "./header";
import { WidgetDefinition, WidgetEnum } from "../widgets/core/model/widget-type";

export const HeaderWidget: WidgetDefinition<HeaderConfig> = {
  id: WidgetEnum.header,
  friendlyName: "Header",
  widgetIcon: <FaHeading />,
  widgetComponent: Header,
  defaultColSpan: 24,
  defaultRowSpan: 3,
  defaultWidgetStyling: false,
};

export interface HeaderConfig {}
