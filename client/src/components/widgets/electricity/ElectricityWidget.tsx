import { WidgetDefinition, WidgetEnum } from "../model/widget-type";
import { ImPower } from "react-icons/im";
import ElectricyConsumption from "./components/electricity-consumption/electricity-consumption";
import ElectricityConfiguration from "./components/configuration/electricity-configuration";
import DocumentationBase from "../core/components/DocumentationBase";

export const ElectricityWidget: WidgetDefinition<ElectricityConfig> = {
  id: WidgetEnum.electricity,
  friendlyName: "Electricity",
  widgetIcon: <ImPower />,
  widgetComponent: <ElectricyConsumption />,
  widgetConfig: {
    component: <ElectricityConfiguration />,
    documentation: (
      <DocumentationBase
        imgPaths={["/img/integrations/elvia.svg"]}
        dataUpdateInterval="60 minutes"
        generalDocumentation="<p>This card shows real time electricity consumption. Helping users monitor and optimize their energy consumption.</p>"
        extraRequirements='<p>To use this widget, you need to have an account with Elvia and generate an API key. Visit their <a href="https://www.elvia.no/smart-forbruk/api-er-for-smartere-hjem-og-bedrifter/slik-kan-du-ta-i-bruk-metervalue-api/" target="_blank" rel="noopener noreferrer">website</a> to create an account and obtain your API key.</p>'
      />
    ),
  },
  defaultColSpan: 12,
  defaultRowSpan: 6,
};

export interface ElectricityConfig {
  electricityKey: string;
}
