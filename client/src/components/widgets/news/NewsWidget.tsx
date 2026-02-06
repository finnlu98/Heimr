import { FaRegNewspaper } from "react-icons/fa";
import News from "./news";
import DocumentationBase from "../core/components/DocumentationBase";
import { WidgetDefinition, WidgetEnum } from "../core/model/widget-type";
import { useNewsQuery } from "./hooks/news-hook";
import { NewsResponse } from "./model/NewsResponse";

const NewsDocumentation = () => (
  <DocumentationBase
    imgPaths={["./img/integrations/nrk_logo.svg"]}
    generalDocumentation="Provides news feed from NRK. You will be able to choose to show news from different categories such as top news, sports, technology, and more soon."
    dataUpdateInterval="15 minutes"
  />
);

export const NewsWidget: WidgetDefinition<NewsConfig, NewsResponse> = {
  id: WidgetEnum.news,
  friendlyName: "News",
  widgetIcon: <FaRegNewspaper />,
  widgetComponent: News,
  useQuery: useNewsQuery,
  widgetConfig: {
    documentation: NewsDocumentation,
  },
  defaultColSpan: 12,
  defaultRowSpan: 8,
};

export interface NewsConfig {}
