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
  swimming = "Swimming",
}

export interface WidgetDefinition<TConfig, TData = unknown, TError = unknown> {
  id: WidgetEnum;
  friendlyName: string;
  widgetIcon: React.ReactNode;
  widgetComponent: React.ComponentType<any>;
  useQuery?: (config?: TConfig) => {
    data?: TData;
    isLoading?: boolean;
    error?: TError;
  };
  widgetConfig?: WidgetConfig<TConfig>;
  defaultWidgetStyling?: boolean;
  defaultColSpan: number;
  defaultRowSpan: number;
  boolenHiddenSupported?: boolean;
  fetchtingInterval?: number;
}

export interface WidgetConfig<TConfig> {
  component?: React.ComponentType<any>;
  documentation?: React.ComponentType<any>;
  config?: TConfig;
}
