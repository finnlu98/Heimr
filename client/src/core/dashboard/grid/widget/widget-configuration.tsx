import Tab from "../../../shared/tab/Tab";
import { IoSettingsOutline } from "react-icons/io5";
import { CiCircleInfo } from "react-icons/ci";
import "./widget-configuration.css";
import { Widgets } from "../../../../widgets/core/model/wigets";
import { WidgetEnum } from "../../../../widgets/core/model/widget-type";
import { useWidgetQuery } from "../../../../widgets/core/hooks/useWidgetQueryResult";
import { useWidgetConfig } from "../../../../widgets/core/hooks/useWidgetConfig";
import { useState } from "react";
import { useDashboard } from "../../../../context/dashboard-context";

interface WidgetConfigurationProps {
  widget: WidgetEnum;
  onClose: () => void;
}

const WidgetConfiguration: React.FC<WidgetConfigurationProps> = ({ widget, onClose }) => {
  const { setWidgetConfig } = useDashboard();
  const [config, setConfig] = useState(useWidgetConfig(widget));
  const widgetData = useWidgetQuery(widget, config);

  // 1. fetch data with loaded data (x)
  // 2. get current config - need to add config is passed to config (x)
  // 3. on changes update current config and load data with new config (x)
  // 4. pass new temporary data to preview component (x)
  // 5. on apply, save config and refetch data with new config
  // 6. on cancel, discard temporary data and config

  // Bug widget not spinning on updating data load
  // Need to get rid of data if its not used in preview

  const handleApply = () => {
    setWidgetConfig(widget, config);
    onClose();
  };

  return (
    <>
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
                    return ConfigComponent ? (
                      <ConfigComponent config={config} setConfig={setConfig} />
                    ) : (
                      <div>No settings available 🗅</div>
                    );
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
                    return DocumentationComponent ? (
                      <DocumentationComponent />
                    ) : (
                      <div>No documentation available 🗅</div>
                    );
                  })(),
                },
              ]}
            />
          </div>
          <div className="widget-container edit-widget-content-item widget-preview">
            {(() => {
              const Preview = Widgets[widget].widgetComponent;
              return (
                <Preview
                  data={widgetData?.data}
                  isLoading={widgetData?.isLoading}
                  error={widgetData?.error}
                  config={config}
                />
              );
            })()}
          </div>
        </div>
      </div>
      <div className="action-buttons h-row">
        <button className="button-tertiary" onClick={onClose}>
          Cancel
        </button>
        <button onClick={handleApply}>Apply 🚀</button>
      </div>
    </>
  );
};

export default WidgetConfiguration;
