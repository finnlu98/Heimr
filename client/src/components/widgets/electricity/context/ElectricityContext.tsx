import { createContext, useMemo, useState, useEffect, useCallback, useContext } from "react";
import { ElviaService } from "../services/ElviaService";
import ElviaFetcher from "../api/elvia-fetcher";
import { ComponentData } from "../model/ElectricityPrices";
import apiClient from "../../../../api/ApiClient";

interface ElectricityContextProps {
  children: React.ReactNode;
}

type ElectricityContextState = {
  elviaService?: ElviaService;
  chartFormattedData?: ComponentData;
  hasElviaKey: boolean;
  getElectricityConsumption: () => Promise<void>;
  postElviaKey: (key: string) => void;
};

const ElectricityContext = createContext<ElectricityContextState | undefined>(undefined);

const ElectricityProvider: React.FC<ElectricityContextProps> = ({ children }) => {
  const [elviaService, setElviaService] = useState<ElviaService | undefined>(undefined);
  const [chartFormattedData, setChartFormattedData] = useState<ComponentData | undefined>(undefined);
  const [hasElviaKey, setHasElviaKey] = useState<boolean>(false);

  const getElectricityConsumption = useCallback(async (): Promise<void> => {
    if (!hasElviaKey) return;
    try {
      const res = await ElviaFetcher();
      setElviaService(res);
    } catch (error) {
      console.error("Failed to fetch electricity consumption data", error);
      return undefined;
    }
  }, [hasElviaKey]);

  const postElviaKey = async (key: string) => {
    try {
      const formatKey = `Bearer ${key.trim()}`;
      await apiClient.post(
        "/integration",
        { provider: "Elvia", key: formatKey },
        {
          meta: {
            loadingKey: "post-elvia-key",
            successMessage: "Send Elvia key successfully",
            errorMessage: "Send Elvia key failed",
          },
        },
      );
      setHasElviaKey(true);
      await getElectricityConsumption();
    } catch (error) {
      console.error("Failed to post Elvia key", error);
    }
  };

  const getHasElviaKey = async (provider: string): Promise<void> => {
    try {
      const res = await apiClient.get<{ integration: string | null }>(`/integration`, {
        params: { provider: provider },
      });
      setHasElviaKey(res.data.integration !== null);
    } catch (error) {
      console.error("Failed to get Elvia key status", error);
      setHasElviaKey(false);
    }
  };

  useEffect(() => {
    getHasElviaKey("Elvia");
  }, []);

  useEffect(() => {
    getElectricityConsumption();
  }, [hasElviaKey, getElectricityConsumption]);

  useEffect(() => {
    const updateInterval = setInterval(getElectricityConsumption, 60 * 60 * 1000);
    return () => clearInterval(updateInterval);
  }, [getElectricityConsumption]);

  useEffect(() => {
    if (elviaService) {
      setChartFormattedData(elviaService.getChartFormattedData());
    }
  }, [elviaService]);

  const value = useMemo(
    () => ({
      elviaService,
      chartFormattedData,
      hasElviaKey,
      getElectricityConsumption,
      postElviaKey,
    }),
    [elviaService, chartFormattedData, hasElviaKey, getElectricityConsumption],
  );
  return <ElectricityContext.Provider value={value}>{children}</ElectricityContext.Provider>;
};

export function useElectricityConsumption() {
  const ctx = useContext(ElectricityContext);
  if (!ctx) throw new Error("useElectricityConsumption must be used inside ElectricityProvider");
  return ctx;
}

export default ElectricityProvider;
