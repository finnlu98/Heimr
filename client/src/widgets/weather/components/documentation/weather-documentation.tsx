import DocumentationBase from "../../../core/components/DocumentationBase";

const WEATHER_FETCH_INTERVAL = 60 * 60 * 1000;

const WeatherDocumentation = () => {
  return (
    <DocumentationBase
        imgPaths={["./img/integrations/met_logo.jpg", "./img/integrations/yr_logo.svg"]}
        provider="met.no"
        dataUpdateInterval={WEATHER_FETCH_INTERVAL}
        generalDocumentation="<p>The Weather widget provides up-to-date weather information for your specified adress.</p>"
    />
  );
};

export default WeatherDocumentation;