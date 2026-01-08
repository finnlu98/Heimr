import { WidgetDefinition, WidgetEnum } from "../model/widget-type";
import { TbHome } from "react-icons/tb";
import HomeActionButtons from "./components/home-action-buttons";

export const HomeWidget: WidgetDefinition<HomeConfig> = {
  id: WidgetEnum.home,
  friendlyName: "Home actions",
  widgetIcon: <TbHome />,
  widgetComponent: <HomeActionButtons />,
  defaultColSpan: 10,
  defaultRowSpan: 4,
};

export interface HomeConfig {}
