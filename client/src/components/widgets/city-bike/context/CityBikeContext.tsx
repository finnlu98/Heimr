import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CityBikeResponse, Station } from "../model/CityBikeResponse";
import { WidgetEnum } from "../../model/widget-type";
import { CityBikeConfig } from "../CityBikeWidget";
import { useDashboard } from "../../../dashboard/dashboard-context";
import CityBikeStatusFetcher, { CityBikeStationsFetcher } from "../api/city-bike-fetcher";
import CityBikeService from "../service/CityBikeService";

interface CityBikeContextProps {
  children: React.ReactNode;
}

type CityBikeContextState = {
  cityBikeData: Map<number, Station> | undefined;
  cityStations: Station[] | null;
};

const CityBikeContext = createContext<CityBikeContextState | undefined>(undefined);

const CityBikeProvider: React.FC<CityBikeContextProps> = ({ children }) => {
  const [cityBikeData, setCityBikeData] = useState<Map<number, Station> | undefined>(undefined);
  const [cityStations, setCityStations] = useState<Station[] | null>(null);
  const { widgetConfigs } = useDashboard();
  const cityBikeConfig = widgetConfigs[WidgetEnum.cityBike] as CityBikeConfig;

  const getCityBikeData = useCallback(async (): Promise<void> => {
    try {
      if (!cityBikeConfig) return;
      const data = await CityBikeStatusFetcher(cityBikeConfig.stations);
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

  const getCityStations = useCallback(async (): Promise<void> => {
    try {
      const respone = await CityBikeStationsFetcher();
      if (!respone || !respone.data) return;
      const closestStations = CityBikeService.getClosestStations(
        { lat: cityBikeConfig.homeCoordinates.lat, lon: cityBikeConfig.homeCoordinates.lon },
        respone,
        500,
      );
      setCityStations(closestStations);
    } catch (error) {
      console.error("Failed to fetch city bike stations data", error);
    }
  }, [cityBikeConfig]);

  useEffect(() => {
    getCityStations();
  }, [getCityStations]);

  const value = useMemo(() => ({ cityBikeData, cityStations }), [cityBikeData, cityStations]);
  return <CityBikeContext.Provider value={value}>{children}</CityBikeContext.Provider>;
};

export function useCityBike() {
  const ctx = useContext(CityBikeContext);
  if (!ctx) throw new Error("useCityBike must be used inside CityBikeProvider");
  return ctx;
}

export default CityBikeProvider;
