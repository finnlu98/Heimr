import { useWidgetQuery } from "../../core/hooks/useWidgetQuery";
import calenderApi, { CalendarEvent } from "../api/calender-ical-fetcher";
import { CalenderConfig } from "../CalenderWidget";

export function useCalenderQuery(config: CalenderConfig | undefined) {
  return useWidgetQuery<CalendarEvent[] | undefined>({
    queryKey: ["calenderEvents"],
    queryFn: async () => {
      if (!config?.calenderICalEndpoints || config.calenderICalEndpoints.length === 0)
        return Promise.resolve(undefined);
      const response = await calenderApi.fetchICalEvents(config.calenderICalEndpoints);
      return response;
    },
    enabled: Boolean(config?.calenderICalEndpoints && config.calenderICalEndpoints.length > 0),
    refetchInterval: 15 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
  });
}
