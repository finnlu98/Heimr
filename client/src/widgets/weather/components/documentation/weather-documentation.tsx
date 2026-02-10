import DocumentationBase from "../../../core/components/DocumentationBase";
import { WeatherWidget } from "../../WeatherWidget";

const WeatherDocumentation = () => {
  return (
    <DocumentationBase
        imgPaths={["./img/integrations/met_logo.jpg", "./img/integrations/yr_logo.svg"]}
        provider="met.no"
        dataUpdateInterval={WeatherWidget.fetchtingInterval ?? 60 * 60 * 1000}
        generalDocumentation="<p>The Weather widget provides up-to-date weather information for your specified adress.</p>"
    />
  );
};

export default WeatherDocumentation;