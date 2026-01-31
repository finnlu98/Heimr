export enum WidgetEnum {
  header = "Header",
  weather = "Weather",
  stocks = "Stocks",
  news = "News",
  laundryWeek = "Laundry Week",
  homeActions = "Home Actions",
  electricity = "Electricity",
  cityBike = "City Bike",
  calender = "Calender",
  busCards = "Bus Cards",
}

export interface WidgetDefinition<T> {
  id: WidgetEnum;
  friendlyName: string;
  widgetIcon: React.ReactNode;
  widgetComponent: React.ReactNode;
  widgetConfig?: WidgetConfig<T>;
  defaultWidgetStyling?: boolean;
  defaultColSpan: number;
  defaultRowSpan: number;
}

export interface WidgetConfig<T> {
  component: React.ReactNode;
  documentation?: React.ReactNode;
  config?: T;
}
