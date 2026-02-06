import { useWidgetQuery } from "../../core/hooks/useWidgetQuery";
import newsApi from "../api/news-fetcher";
import { NewsResponse } from "../model/NewsResponse";

export function useNewsQuery() {
  return useWidgetQuery<NewsResponse | undefined>({
    queryKey: ["news"],
    queryFn: () => {
      return newsApi.getNewsData();
    },
    enabled: true,
    refetchInterval: 60 * 15 * 1000,
    staleTime: 50 * 15 * 1000,
  });
}
