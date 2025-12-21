import { WidgetDefinition, WidgetEnum } from "./widget-type";
import { TravelCardWidget } from "../bus-cards/TravelCardWidget";
import { CalenderWidget } from "../calender/CalenderWidget";
import { NewsWidget } from "../news/NewsWidget";
import { CityBikeWidget } from "../city-bike/CityBikeWidget";
import { ElectricityWidget } from "../electricity/ElectricityWidget";
import { HomeWidget } from "../home/HomeWidget";
import { LaundryWeekWidget } from "../laundry-week/LaundryWeekWidget";
import { StocksWidget } from "../stocks/StocksWidget";
import { WeatherWidget } from "../weather/WeatherWidget";

export const Widgets: Record<WidgetEnum, WidgetDefinition<any>> = {
  [WidgetEnum.weather]: WeatherWidget,
  [WidgetEnum.stocks]: StocksWidget,
  [WidgetEnum.news]: NewsWidget,
  [WidgetEnum.laundryWeek]: LaundryWeekWidget,
  [WidgetEnum.home]: HomeWidget,
  [WidgetEnum.electricity]: ElectricityWidget,
  [WidgetEnum.cityBike]: CityBikeWidget,
  [WidgetEnum.calender]: CalenderWidget,
  [WidgetEnum.busCards]: TravelCardWidget,
};

export const WidgetConfigs: Record<WidgetEnum, object> = (
  Object.keys(Widgets) as WidgetEnum[]
).reduce(
  (acc, key) => {
    acc[key] = Widgets[key].widgetConfig?.config ?? undefined;
    return acc;
  },
  {} as Record<WidgetEnum, object>,
);
