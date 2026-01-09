import { GridItem } from "../components/dashboard/grid/model/grid-models";
import { WidgetEnum } from "../components/widgets/model/widget-type";

export type HomeConfig = {
  widgetPositions: GridItem[] | null;
  widgetConfig: Record<WidgetEnum, object> | null;
};
