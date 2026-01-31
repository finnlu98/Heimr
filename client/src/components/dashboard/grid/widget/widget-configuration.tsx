import { Widgets } from "../../../widgets/model/wigets";
import { WidgetEnum } from "../../../widgets/model/widget-type";
import "./widget-configuration.css";
import Tab from "../../../shared/tab/Tab";

interface WidgetConfigurationProps {
  widget: WidgetEnum;
}

const WidgetConfiguration: React.FC<WidgetConfigurationProps> = ({ widget }) => {
  return (
    <div className="edit-widget-container">
      <div className="edit-widget-content">
        <div className="config-container edit-widget-content-item surface">
          <Tab
            tabs={[
              {
                label: "⚙️ Settings",
                content: Widgets[widget].widgetConfig?.component ? (
                  Widgets[widget].widgetConfig?.component
                ) : (
                  <div>No settings available 🗅</div>
                ),
              },
              {
                label: "❓ About",
                content: Widgets[widget].widgetConfig?.documentation ? (
                  Widgets[widget].widgetConfig?.documentation
                ) : (
                  <div>No documentation available 🗅</div>
                ),
              },
            ]}
          />
        </div>
        <div className="widget-container edit-widget-content-item">{Widgets[widget].widgetComponent}</div>
      </div>
    </div>
  );
};

export default WidgetConfiguration;
