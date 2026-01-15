import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Station } from "../model/CityBikeResponse";
import { WidgetEnum } from "../../model/widget-type";
import { CityBikeConfig } from "../CityBikeWidget";
import { useDashboard } from "../../../dashboard/dashboard-context";
import CityBikeFetcher from "../api/city-bike-fetcher";

interface CityBikeContextProps {
  children: React.ReactNode;
}

type CityBikeContextState = {
  cityBikeData: Map<number, Station> | undefined;
};

const CityBikeContext = createContext<CityBikeContextState | undefined>(undefined);

const CityBikeProvider: React.FC<CityBikeContextProps> = ({ children }) => {
  const [cityBikeData, setCityBikeData] = useState<Map<number, Station> | undefined>(undefined);
  const { widgetConfigs } = useDashboard();
  const cityBikeConfig = widgetConfigs[WidgetEnum.cityBike] as CityBikeConfig;

  const getCityBikeData = useCallback(async (): Promise<void> => {
    try {
      if (!cityBikeConfig) return;
      const data = await CityBikeFetcher(cityBikeConfig.stations);
      setCityBikeData(data);
    } catch (error) {
      console.error("Failed to fetch city bike data", error);
    }
  }, [cityBikeConfig]);

  useEffect(() => {
    getCityBikeData();
  }, [getCityBikeData]);

  useEffect(() => {
    const updateInterval = setInterval(getCityBikeData, 15 * 5 * 1000);
    return () => clearInterval(updateInterval);
  }, [getCityBikeData]);

  const value = useMemo(() => ({ cityBikeData }), [cityBikeData]);
  return <CityBikeContext.Provider value={value}>{children}</CityBikeContext.Provider>;
};

export function useCityBike() {
  const ctx = useContext(CityBikeContext);
  if (!ctx) throw new Error("useCityBike must be used inside CityBikeProvider");
  return ctx;
}

export default CityBikeProvider;
