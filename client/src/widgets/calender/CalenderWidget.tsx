import { SlCalender } from "react-icons/sl";
import Calender from "./components/card/calender";
import CalenderConfiguration from "./components/configuration/calender-configuration";
import DocumentationBase from "../core/components/DocumentationBase";
import { WidgetDefinition, WidgetEnum } from "../core/model/widget-type";
import { CalendarEvent } from "./api/calender-ical-fetcher";
import { useCalenderQuery } from "./hook/calender-hook";

const CalenderDocumentation = () => (
  <DocumentationBase
    imgPaths={[
      "./img/integrations/google_calender.png",
      "./img/integrations/apple_calender.png",
      "./img/integrations/microsoft_calender.png",
    ]}
    dataUpdateInterval="24 hours"
    generalDocumentation="<p>This widget integrates with any calender that provides iCal endpoints, allowing you to display events from multiple calendar sources in one place.</p>"
    extraRequirements="<p>To use this widget, you need to find if your calender provides an iCal feed. Common calenders like Google Calendar, Apple Calendar, and Outlook Calendar offer this. Read more on your providers website.</p>"
  />
);

export const CalenderWidget: WidgetDefinition<CalenderConfig, CalendarEvent[]> = {
  id: WidgetEnum.calender,
  friendlyName: "Calender",
  widgetIcon: <SlCalender />,
  useQuery: useCalenderQuery,
  widgetComponent: Calender,
  widgetConfig: {
    component: CalenderConfiguration,
    documentation: CalenderDocumentation,
  },
  defaultColSpan: 12,
  defaultRowSpan: 8,
};

export interface CalenderConfig {
  calenderId: string;
  calenderKey: string;
  calenderICalEndpoints: string[];
}
