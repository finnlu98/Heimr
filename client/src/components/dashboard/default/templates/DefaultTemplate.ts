import { WidgetEnum } from "../../../widgets/model/widget-type";
import { GridItem } from "../../grid/model/grid-models";

const defaultTemplate: GridItem[] = [
  {
    id: "60db3294-5374-4bf7-b29f-895e6e74f3b7",
    col: 13,
    row: 8,
    widget: WidgetEnum.news,
    colSpan: 11,
    rowSpan: 6,
  },
  {
    id: "942c9130-9db9-4574-aac2-6095f3399f17",
    col: 0,
    row: 7,
    widget: WidgetEnum.weather,
    colSpan: 13,
    rowSpan: 7,
  },
  {
    id: "d157f2d8-06aa-4636-8b27-a3110ff2b672",
    col: 0,
    row: 0,
    widget: WidgetEnum.busCards,
    colSpan: 13,
    rowSpan: 7,
  },
  {
    id: "9484eb7b-6592-4dd4-983c-7c901efc9536",
    col: 13,
    row: 14,
    widget: WidgetEnum.calender,
    colSpan: 11,
    rowSpan: 6,
  },
  {
    id: "e171c147-378e-4d48-83a1-c418dbf6ae60",
    col: 0,
    row: 14,
    widget: WidgetEnum.electricity,
    colSpan: 13,
    rowSpan: 9,
  },
  {
    id: "b17844ad-b696-453e-a884-87a4ad4c4efa",
    col: 13,
    row: 0,
    colSpan: 11,
    rowSpan: 8,
    widget: WidgetEnum.cityBike,
  },
];

export default defaultTemplate;
