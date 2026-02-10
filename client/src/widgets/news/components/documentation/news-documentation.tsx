import DocumentationBase from "../../../core/components/DocumentationBase";
import { NewsWidget } from "../../NewsWidget";

const NewsDocumentation = () => (
  <DocumentationBase
    imgPaths={["./img/integrations/nytimes_logo.png"]}
    provider="The New York Times"
    dataUpdateInterval={NewsWidget.fetchtingInterval ?? 15 * 60 * 1000}
    generalDocumentation="<p>Provides news feed from NRK. You will be able to choose to show news from different categories such as top news, sports, technology, and more soon.</p>"
  />
);

export default NewsDocumentation;