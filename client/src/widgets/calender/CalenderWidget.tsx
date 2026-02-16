import { SlCalender } from "react-icons/sl";
import Calender from "./components/card/calender";
import CalenderConfiguration from "./components/configuration/calender-configuration";
import { WidgetDefinition, WidgetEnum } from "../core/model/widget-type";
import { CalendarEvent } from "./api/calender-ical-fetcher";
import { useCalenderQueries } from "./hook/calender-hook";
import CalenderDocumentation from "./components/documentation/calender-documentation";

export const CalenderWidget: WidgetDefinition<CalenderConfig, CalendarEvent[]> = {
  id: WidgetEnum.calender,
  friendlyName: "Calender",
  widgetIcon: <SlCalender />,
  useQuery: useCalenderQueries,
  widgetComponent: Calender,
  widgetConfig: {
    component: CalenderConfiguration,
    documentation: CalenderDocumentation,
  },
  defaultColSpan: 12,
  defaultRowSpan: 8,
  fetchtingInterval: 24 * 60 * 60 * 1000,
};

export interface CalenderConfig {
  calenderId: string;
  calenderKey: string;
  calenderICalEndpoints: string[];
}
