import { WidgetDefinition, WidgetEnum } from "../model/widget-type";
import { AiOutlineStock } from "react-icons/ai";
import StocksConfiguration from "./components/configuration/stocksConfiguration";
import Stocks from "./components/card/stocks";

export const StocksWidget: WidgetDefinition<StocksConfig> = {
  id: WidgetEnum.stocks,
  friendlyName: "Stocks",
  widgetIcon: <AiOutlineStock />,
  widgetComponent: <Stocks />,
  widgetConfig: {
    component: <StocksConfiguration />,
  },
  defaultColSpan: 10,
  defaultRowSpan: 4,
};

export interface StocksConfig {
  tickers: string[];
}
