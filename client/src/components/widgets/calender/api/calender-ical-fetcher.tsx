import moment, { Moment } from "moment";
import apiClient from "../../../../api/ApiClient";

import ICAL from "ical.js";

export interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: Moment;
  end: Moment;
  location?: string;
  isAllDay: boolean;
}

export const ICalCalendarFetcher = async (endpoints: string[]): Promise<CalendarEvent[]> => {
  const calendarEvents: CalendarEvent[] = [];

  for (const endpoint of endpoints) {
    try {
      const response = await apiClient.post<string>(
        "/broker",
        {
          endpoint: endpoint,
        },
        {
          meta: {
            loadingKey: `fetch-ical-events`,
          },
        },
      );
      const events = parseICalData(response.data);
      calendarEvents.push(...events);
    } catch (error) {
      console.error(`Failed to fetch iCal data from endpoint ${endpoint}:`, error);
    }
  }

  const filteredEvents = filterPastEvents(calendarEvents);

  return filteredEvents;
};

const parseICalData = (icalData: string): CalendarEvent[] => {
  try {
    const jcalData = ICAL.parse(icalData);
    const comp = new ICAL.Component(jcalData);
    const vevents = comp.getAllSubcomponents("vevent");

    return vevents.map((vevent) => {
      const event = new ICAL.Event(vevent);

      return {
        id: event.uid,
        summary: event.summary,
        description: event.description,
        start: moment(event.startDate.toJSDate()),
        end: moment(event.endDate.toJSDate()),
        location: event.location,
        isAllDay: event.startDate.isDate,
      };
    });
  } catch (error) {
    console.error("Failed to parse iCal data:", error);
    return [];
  }
};

const filterPastEvents = (events: CalendarEvent[]): CalendarEvent[] => {
  const now = moment();
  return events.filter((event) => event.end.isAfter(now));
};
