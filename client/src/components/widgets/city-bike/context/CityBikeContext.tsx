import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CityBikeResponse, Station } from "../model/CityBikeResponse";
import { WidgetEnum } from "../../model/widget-type";
import { CityBikeConfig } from "../CityBikeWidget";
import { useDashboard } from "../../../dashboard/dashboard-context";
import CityBikeStatusFetcher, { CityBikeStationsFetcher } from "../api/city-bike-fetcher";
import CityBikeService from "../service/CityBikeService";
import { Coordinate } from "../../../../model/Coordinate";

interface CityBikeContextProps {
  children: React.ReactNode;
}

type CityBikeContextState = {
  cityBikeData: Map<number, Station> | undefined;
  cityStations: Station[] | null;
  setClosestStations: (coordinate: Coordinate) => Promise<void>;
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

  const setClosestStations = useCallback(async (coordinate: Coordinate): Promise<void> => {
    try {
      const respone = await CityBikeStationsFetcher();
      if (!respone || !respone.data) return;
      const closestStations = CityBikeService.getClosestStations(
        { lat: coordinate.lat, lon: coordinate.lon },
        respone,
        500,
      );
      setCityStations(closestStations);
    } catch (error) {
      console.error("Failed to fetch city bike stations data", error);
    }
  }, []);

  useEffect(() => {
    if (cityBikeConfig?.homeCoordinates) {
      setClosestStations(cityBikeConfig.homeCoordinates);
    }
  }, [cityBikeConfig?.homeCoordinates?.lat, cityBikeConfig?.homeCoordinates?.lon, setClosestStations]);

  const value = useMemo(
    () => ({ cityBikeData, cityStations, setClosestStations }),
    [cityBikeData, cityStations, setClosestStations],
  );
  return <CityBikeContext.Provider value={value}>{children}</CityBikeContext.Provider>;
};

export function useCityBike() {
  const ctx = useContext(CityBikeContext);
  if (!ctx) throw new Error("useCityBike must be used inside CityBikeProvider");
  return ctx;
}

export default CityBikeProvider;
