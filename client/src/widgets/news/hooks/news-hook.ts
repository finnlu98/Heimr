import { useWidgetQuery } from "../../core/hooks/useWidgetQuery";
import newsApi from "../api/news-fetcher";
import { NewsResponse } from "../model/NewsResponse";
import { NewsWidget } from "../NewsWidget";

export function useNewsQuery() {
  return useWidgetQuery<NewsResponse | undefined>({
    queryKey: ["news"],
    queryFn: () => {
      return newsApi.getNewsData();
    },
    enabled: true,
    refetchInterval: NewsWidget.fetchtingInterval,
    staleTime: 50 * 15 * 1000,
  });
}
