import { WidgetDefinition, WidgetEnum } from "../model/widget-type";
import { FaRegNewspaper } from "react-icons/fa";
import News from "./news";

export const NewsWidget: WidgetDefinition<NewsConfig> = {
    id: WidgetEnum.news,
    friendlyName: "News",
    widgetIcon: <FaRegNewspaper />,
    widgetComponent: <News />,
    defaultColSpan: 10,
    defaultRowSpan: 4

}

export interface NewsConfig {}