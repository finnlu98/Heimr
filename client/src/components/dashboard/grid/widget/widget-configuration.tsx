import Tab from "../../../shared/tab/Tab";
import { IoSettingsOutline } from "react-icons/io5";
import { CiCircleInfo } from "react-icons/ci";
import "./widget-configuration.css";
import { Widgets } from "../../../widgets/core/model/wigets";
import { WidgetEnum } from "../../../widgets/core/model/widget-type";
import { useWidgetQueryResult } from "../../../widgets/core/hooks/useWidgetQueryResult";

interface WidgetConfigurationProps {
  widget: WidgetEnum;
}

const WidgetConfiguration: React.FC<WidgetConfigurationProps> = ({ widget }) => {
  const queryResult = useWidgetQueryResult(widget);

  return (
    <div className="edit-widget-container">
      <div className="edit-widget-content">
        <div className="config-container edit-widget-content-item surface">
          <Tab
            tabs={[
              {
                label: (
                  <div className="h-row">
                    <IoSettingsOutline />
                    Settings
                  </div>
                ),
                content: (() => {
                  const ConfigComponent = Widgets[widget].widgetConfig?.component;
                  return ConfigComponent ? <ConfigComponent /> : <div>No settings available 🗅</div>;
                })(),
              },
              {
                label: (
                  <div className="h-row">
                    <CiCircleInfo />
                    About
                  </div>
                ),
                content: (() => {
                  const DocumentationComponent = Widgets[widget].widgetConfig?.documentation;
                  return DocumentationComponent ? <DocumentationComponent /> : <div>No documentation available 🗅</div>;
                })(),
              },
            ]}
          />
        </div>
        <div className="widget-container edit-widget-content-item widget-preview">
          {(() => {
            const Preview = Widgets[widget].widgetComponent;
            return <Preview data={queryResult?.data} isLoading={queryResult?.isLoading} error={queryResult?.error} />;
          })()}
        </div>
      </div>
    </div>
  );
};

export default WidgetConfiguration;
