import { Widgets } from "../../../widgets/model/wigets";
import { WidgetEnum } from "../../../widgets/model/widget-type";
import "./widget-configuration.css";

interface WidgetConfigurationProps {
  widget: WidgetEnum;
}

const WidgetConfiguration: React.FC<WidgetConfigurationProps> = ({ widget }) => {
  return (
    <div className="edit-widget-container">
      <div className="edit-widget-content">
        <div className="config-container edit-widget-content-item surface">
          {Widgets[widget].widgetConfig ? Widgets[widget].widgetConfig?.component : <div>No config available</div>}
        </div>
        <div className="widget-container edit-widget-content-item">{Widgets[widget].widgetComponent}</div>
      </div>
    </div>
  );
};

export default WidgetConfiguration;
