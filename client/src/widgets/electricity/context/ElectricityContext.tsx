import { useCallback, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ElviaService } from "../services/ElviaService";
import ElviaFetcher from "../api/elvia-fetcher";
import { ComponentData } from "../model/ElectricityPrices";
import apiClient from "../../../api/ApiClient";
import { useWidgetQuery } from "../../core/hooks/useWidgetQuery";

type ElectricityHookState = {
  hasElviaKey: boolean;
  postElviaKey: (key: string) => Promise<void>;
};

const ELVIA_PROVIDER = "Elvia";
const HAS_ELVIA_KEY_QUERY_KEY = ["elvia", "has-key"];
const ELVIA_CONSUMPTION_QUERY_KEY = ["elvia", "consumption"];

export function useElectricityConsumption(): ElectricityHookState {
  const queryClient = useQueryClient();

  const hasKeyQuery = useWidgetQuery<boolean>({
    queryKey: HAS_ELVIA_KEY_QUERY_KEY,
    queryFn: async () => {
      try {
        const res = await apiClient.get<{ integration: string | null }>("/integration", {
          params: { provider: ELVIA_PROVIDER },
          meta: {
            loadingKey: "has-elvia-key",
            errorMessage: "Failed to get Elvia key status",
          },
        });
        return res.data.integration !== null;
      } catch (error) {
        console.error("Failed to get Elvia key status", error);
        return false;
      }
    },
    staleTime: 0,
  });

  const hasElviaKey = hasKeyQuery.data ?? false;

  // const consumptionQuery = useWidgetQuery<ElviaService>({
  //   queryKey: ELVIA_CONSUMPTION_QUERY_KEY,
  //   queryFn: ElviaFetcher,
  //   enabled: hasElviaKey,
  //   refetchInterval: ELVIA_CONSUMPTION_REFETCH_MS,
  // });

  const postKeyMutation = useMutation({
    mutationFn: async (key: string) => {
      const formatKey = `Bearer ${key.trim()}`;
      await apiClient.post(
        "/integration",
        { provider: ELVIA_PROVIDER, key: formatKey },
        {
          meta: {
            loadingKey: "post-elvia-key",
            successMessage: "Send Elvia key successfully",
            errorMessage: "Send Elvia key failed",
          },
        },
      );
    },
    onSuccess: async () => {
      queryClient.setQueryData(HAS_ELVIA_KEY_QUERY_KEY, true);
      await queryClient.invalidateQueries({ queryKey: ELVIA_CONSUMPTION_QUERY_KEY });
    },
  });

  const postElviaKey = useCallback(
    async (key: string): Promise<void> => {
      await postKeyMutation.mutateAsync(key);
    },
    [postKeyMutation],
  );

  return {
    hasElviaKey,
    postElviaKey,
  };
}

// const getElectricityConsumption = useCallback(async (): Promise<void> => {
//   if (!hasElviaKey) return;
//   await consumptionQuery.refetch();
// }, [hasElviaKey, consumptionQuery]);
