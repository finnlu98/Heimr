import { WidgetDefinition, WidgetEnum } from "../model/widget-type";
import { FaRegNewspaper } from "react-icons/fa";
import News from "./news";
import DocumentationBase from "../core/components/DocumentationBase";

export const NewsWidget: WidgetDefinition<NewsConfig> = {
  id: WidgetEnum.news,
  friendlyName: "News",
  widgetIcon: <FaRegNewspaper />,
  widgetComponent: <News />,
  widgetConfig: {
    component: null,
    documentation: (
      <DocumentationBase
        imgPaths={["./img/integrations/nrk_logo.svg"]}
        generalDocumentation="Provides news feed from NRK. You will be able to choose to show news from different categories such as top news, sports, technology, and more soon."
        dataUpdateInterval="15 minutes"
      />
    ),
  },
  defaultColSpan: 12,
  defaultRowSpan: 8,
};

export interface NewsConfig {}
