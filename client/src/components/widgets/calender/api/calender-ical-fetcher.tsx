import moment, { Moment } from "moment";

import ICAL from "ical.js";
import BaseWidgetApi from "../../core/api/BaseWidgetApi";

export interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: Moment;
  end: Moment;
  location?: string;
  isAllDay: boolean;
}

class CalenderApi extends BaseWidgetApi {
  async fetchICalEvents(endpoints: string[]): Promise<CalendarEvent[]> {
    const calendarEvents: CalendarEvent[] = [];

    for (const endpoint of endpoints) {
      try {
        const response = await this.postInternalJson<string>(
          "/broker",
          {},
          { endpoint: endpoint },
          "fetch-ical-events",
        );

        const events = this.parseICalData(response);
        calendarEvents.push(...events);
      } catch (error) {
        console.error(`Failed to fetch iCal data from endpoint ${endpoint}:`, error);
      }
    }

    const filteredEvents = this.filterPastEvents(calendarEvents);

    return filteredEvents;
  }

  private parseICalData(icalData: string): CalendarEvent[] {
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
  }

  private filterPastEvents(events: CalendarEvent[]): CalendarEvent[] {
    const now = moment();
    return events.filter((event) => event.end.isAfter(now));
  }
}

const calenderApi = new CalenderApi();
export default calenderApi;
