import { WidgetEnum } from "../model/widget-type";
import { Widgets } from "../model/wigets";
import { useWidgetConfig } from "./useWidgetConfig";

export function useWidgetQueryResult<TConfig, TData = unknown, TError = unknown>(widget: WidgetEnum) {
  const config = useWidgetConfig<TConfig>(widget);
  const defaultQueryResult = {
    data: undefined,
    isLoading: false,
    error: undefined,
  };
  const useWidgetQuery = Widgets[widget].useQuery ?? (() => defaultQueryResult);
  return useWidgetQuery(config as TConfig);
}
