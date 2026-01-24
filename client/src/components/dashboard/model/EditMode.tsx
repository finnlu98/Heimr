export type EditModeState = {
  editMode: boolean;
  editingWidgetKey: EditingKey | null;
};

export enum EditingKey {
  layoutTemplate = "Layout Template",
  profile = "Profile",
  weather = "Weather",
  stocks = "Stocks",
  news = "News",
  laundryWeek = "Laundry  Week",
  homeActions = "Home Actions",
  electricity = "Electricity",
  cityBike = "City Bike",
  calender = "Calender",
  busCards = "Bus Cards",
}
