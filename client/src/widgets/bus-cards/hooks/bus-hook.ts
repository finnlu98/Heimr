import { useQueries } from "@tanstack/react-query";
import { busApi } from "../api/bus-time-fetcher";
import { BusData } from "../model/BusData";
import { TravelCardConfig, TravelCardWidget } from "../TravelCardWidget";
import TravelCard from "../components/card/travel-card";


export function useBusQueries(config: TravelCardConfig | undefined): { data: BusData[] | undefined } {
  const routes = config?.travelRoutes ?? [];
  const results = useQueries({
    queries: routes.map((travelRoute) => ({
      queryKey: ["busTimes", travelRoute?.startPlace.properties.id, travelRoute?.stopPlace.properties.id],
      queryFn: () => {
        if (!travelRoute) return Promise.resolve(undefined);

        return busApi.getBusTimes(travelRoute);
      },
      enabled: Boolean(travelRoute),
      refetchInterval: TravelCardWidget.fetchtingInterval,
      staleTime: 5 * 60 * 1000,
    })),
  });

  if (routes.length === 0) {
    return { data: undefined };
  }

  const busTimes: BusData[] = [];
  results.forEach((result, index) => {
    const travelResponse = result.data;
    if (travelResponse) {
      busTimes.push(new BusData(travelResponse, routes[index]));
    }
  });

  return { data: busTimes };
}
