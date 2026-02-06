import { useWidgetQuery } from "../../core/hooks/useWidgetQuery";
import { busApi } from "../api/bus-time-fetcher";
import { BusData } from "../model/BusData";
import { TravelCardConfig } from "../TravelCardWidget";

export function useBusQuery(config: TravelCardConfig | undefined) {
  return useWidgetQuery<BusData[] | undefined>({
    queryKey: ["busTimes"],
    queryFn: () => {
      if (!config || (config && config?.travelRoutes && config?.travelRoutes?.length < 1))
        return Promise.resolve(undefined);

      return busApi.getBusTimes(config.travelRoutes);
    },
    enabled: Boolean(config?.travelRoutes && config?.travelRoutes.length > 0),
    refetchInterval: 7 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });
}
