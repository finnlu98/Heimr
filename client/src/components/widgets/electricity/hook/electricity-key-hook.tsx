import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useWidgetQuery } from "../../core/hooks/useWidgetQuery";
import { ELVIA_CONSUMPTION_QUERY_KEY, HAS_ELVIA_KEY_QUERY_KEY } from "./electricity-query-keys";
import elviaApi from "../api/elvia-fetcher";

type ElviaKeyState = {
  hasElviaKey: boolean;
  postElviaKey: (key: string) => Promise<void>;
};

export function useElviaKeyQuery() {
  return useWidgetQuery<boolean>({
    queryKey: HAS_ELVIA_KEY_QUERY_KEY,
    queryFn: () => elviaApi.getHasElviaKey(),
    staleTime: 0,
  });
}

export function useElviaKeyStatus(): boolean {
  const hasKeyQuery = useElviaKeyQuery();
  return hasKeyQuery.data ?? false;
}

export function useElviaKeyManagement(): ElviaKeyState {
  const queryClient = useQueryClient();
  const hasElviaKey = useElviaKeyStatus();

  const postKeyMutation = useMutation({
    mutationFn: async (key: string) => {
      const formatKey = `Bearer ${key.trim()}`;
      await elviaApi.postElviaKey(formatKey);
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
