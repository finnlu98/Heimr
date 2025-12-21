
export enum WidgetEnum {
    weather = "Weather",
    stocks = "Stocks",
    news = "News",
    laundryWeek = "Laundry Week",
    home = "Home",
    electricity = "Electricity",
    cityBike = "City Bike",
    calender = "Calender",
    busCards = "Bus Cards"
}

export interface WidgetDefinition<T> {
  id: WidgetEnum;
  friendlyName: string;
  widgetIcon: React.ReactNode;
  widgetComponent: React.ReactNode;
  widgetConfig?: WidgetConfig<T>;
  defaultColSpan: number;
  defaultRowSpan: number;
}

export interface WidgetConfig<T> {
  component: React.ReactNode;
  config?: T;
}

