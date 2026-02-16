import { WeatherData } from "../model/data/WeatherData";
import weatherApi from "../api/WeatherApi";
import type { WeatherConfig } from "../WeatherWidget";
import { useWidgetQuery } from "../../core/hooks/useWidgetQuery";

const WEATHER_FETCH_INTERVAL = 60 * 60 * 1000;

export function useWeatherQuery(config: WeatherConfig | undefined) {
  return useWidgetQuery<WeatherData | undefined>({
    queryKey: ["weather", config?.lat, config?.lon],
    queryFn: () => {
      if (!config?.lat || !config?.lon) return Promise.resolve(undefined);
      return weatherApi.getWeatherData(config.lat, config.lon);
    },
    enabled: Boolean(config?.lat && config?.lon),
    refetchInterval: WEATHER_FETCH_INTERVAL,
    staleTime: 50 * 60 * 1000,
  });
}
