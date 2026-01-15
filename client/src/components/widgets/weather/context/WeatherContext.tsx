import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { WeatherData } from "../model/data/WeatherData";
import { useDashboard } from "../../../dashboard/dashboard-context";
import { WidgetEnum } from "../../model/widget-type";
import { WeatherConfig } from "../WeatherWidget";
import FetchWeatherAndSunset from "../api/weather-fetcher";

interface WeatherContextProps {
  children: React.ReactNode;
}

type WeatherContextState = {
  weatherData: WeatherData | undefined;
};

const WeatherContext = createContext<WeatherContextState | undefined>(undefined);

const WeatherProvider: React.FC<WeatherContextProps> = ({ children }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>(undefined);
  const { widgetConfigs } = useDashboard();
  const weatherConfig = widgetConfigs[WidgetEnum.weather] as WeatherConfig;

  const getWeatherData = useCallback(async (): Promise<void> => {
    if (!weatherConfig || !weatherConfig?.lat || !weatherConfig?.lon) return;
    try {
      const weatherResponse = await FetchWeatherAndSunset(weatherConfig.lat, weatherConfig.lon);
      setWeatherData(weatherResponse);
    } catch (error) {
      console.error("Failed to fetch weather data", error);
    }
  }, [weatherConfig]);

  useEffect(() => {
    getWeatherData();
  }, [getWeatherData]);

  useEffect(() => {
    const updateInterval = setInterval(getWeatherData, 60 * 60 * 1000);
    return () => clearInterval(updateInterval);
  }, [getWeatherData]);

  const value = useMemo(() => ({ weatherData }), [weatherData]);

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
};

export function useWeather() {
  const ctx = useContext(WeatherContext);
  if (!ctx) throw new Error("useWeather must be used inside WeatherProvider");
  return ctx;
}

export default WeatherProvider;
