import DocumentationBase from "../../../core/components/DocumentationBase";
import { CityBikeWidget } from "../../CityBikeWidget";

const CityBikeDocumentation = () => (
    <DocumentationBase
        provider="Oslo City Bike"
        generalDocumentation="<p>The City Bike widget displays real-time information about available city bikes at various stations in your selected area. Stay updated on bike availability and plan your rides accordingly.</p>"
        dataUpdateInterval={CityBikeWidget.fetchtingInterval ?? 3 * 60 * 1000}
    />
);

export default CityBikeDocumentation;