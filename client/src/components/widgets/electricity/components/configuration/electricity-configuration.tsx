import { useDashboard } from "../../../../dashboard/dashboard-context";
import { WidgetEnum } from "../../../model/widget-type";
import { ElectricityConfig } from "../../ElectricityWidget";

const ElectricityConfiguration: React.FC = () => {
  const { widgetConfigs, setWidgetConfig } = useDashboard();
  const config = (widgetConfigs[
    WidgetEnum.electricity
  ] as ElectricityConfig) ?? { electricityKey: "" };

  const handleChange = (newConfig: Partial<ElectricityConfig>) => {
    setWidgetConfig(WidgetEnum.electricity, {
      ...config,
      ...newConfig,
    });
  };

  return (
    <div className="h-column">
      <label htmlFor="electricityKey">Elvia API Key:</label>
      <input
        type="text"
        value={config.electricityKey || ""}
        onChange={(e) => handleChange({ electricityKey: e.target.value })}
      />
    </div>
  );
};

export default ElectricityConfiguration;
