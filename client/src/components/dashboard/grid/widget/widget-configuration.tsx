import { Widgets } from "../../../widgets/model/wigets";
import { WidgetEnum } from "../../../widgets/model/widget-type";
import Tab from "../../../shared/tab/Tab";
import { IoSettingsOutline } from "react-icons/io5";
import { CiCircleInfo } from "react-icons/ci";
import "./widget-configuration.css";

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
                label: (
                  <div className="h-row">
                    <IoSettingsOutline />
                    Settings
                  </div>
                ),
                content: Widgets[widget].widgetConfig?.component ? (
                  Widgets[widget].widgetConfig?.component
                ) : (
                  <div>No settings available 🗅</div>
                ),
              },
              {
                label: (
                  <div className="h-row">
                    <CiCircleInfo />
                    About
                  </div>
                ),
                content: Widgets[widget].widgetConfig?.documentation ? (
                  Widgets[widget].widgetConfig?.documentation
                ) : (
                  <div>No documentation available 🗅</div>
                ),
              },
            ]}
          />
        </div>
        <div className="widget-container edit-widget-content-item widget-preview">
          {Widgets[widget].widgetComponent}
        </div>
      </div>
    </div>
  );
};

export default WidgetConfiguration;
