import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CalendarEvent, ICalCalendarFetcher } from "../api/calender-ical-fetcher";
import { useDashboard } from "../../../dashboard/dashboard-context";
import { CalenderConfig } from "../CalenderWidget";
import { WidgetEnum } from "../../model/widget-type";

interface CalenderContextProps {
  children: React.ReactNode;
}

type CalenderContextState = {
  calenderEvents: CalendarEvent[] | null;
};

const CalenderContext = createContext<CalenderContextState | undefined>(undefined);

const CalenderProvider: React.FC<CalenderContextProps> = ({ children }) => {
  const [calenderEvents, setCalenderEvents] = useState<CalendarEvent[] | null>(null);
  const { widgetConfigs } = useDashboard();
  const calenderConfig = widgetConfigs[WidgetEnum.calender] as CalenderConfig;

  const getCalenderEvents = async (): Promise<void> => {
    if (!calenderConfig?.calenderICalEndpoints?.length) return;
    try {
      const events = await ICalCalendarFetcher(calenderConfig.calenderICalEndpoints);
      setCalenderEvents(events);
    } catch (error) {
      console.error("Failed to fetch calendar events", error);
    }
  };

  useEffect(() => {
    getCalenderEvents();
  }, [calenderConfig?.calenderICalEndpoints]);

  useEffect(() => {
    const updateInterval = setInterval(getCalenderEvents, 24 * 60 * 60 * 1000);
    return () => clearInterval(updateInterval);
  }, [getCalenderEvents]);

  const value = useMemo(() => ({ calenderEvents }), [calenderEvents]);

  return <CalenderContext.Provider value={value}>{children}</CalenderContext.Provider>;
};

export function useCalender() {
  const ctx = useContext(CalenderContext);
  if (!ctx) throw new Error("useCalender must be used inside CalenderProvider");
  return ctx;
}

export default CalenderProvider;
