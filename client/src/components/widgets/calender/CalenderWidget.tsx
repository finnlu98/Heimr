import { SlCalender } from "react-icons/sl";
import { WidgetDefinition, WidgetEnum } from "../model/widget-type";
import Calender from "./components/card/calender";
import CalenderConfiguration from "./components/configuration/calender-configuration";

export const CalenderWidget: WidgetDefinition<CalenderConfig> = {
    id: WidgetEnum.calender,
    friendlyName: "Calender",
    widgetIcon: <SlCalender />,
    widgetComponent: <Calender />,
    widgetConfig: {
        component: <CalenderConfiguration />
    },
    defaultColSpan: 6,
    defaultRowSpan: 6,
}

export interface CalenderConfig {
    calenderId: string;
    calenderKey: string;
}