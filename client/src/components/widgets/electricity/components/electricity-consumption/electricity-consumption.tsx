import { useEffect, useState } from "react";
import ElviaFetcher from "../../api/elvia-fetcher";
import { ElviaService } from "../../services/ElviaService";
import { ComponentData } from "../../model/ElectricityPrices";
import moment from "moment";
import "./electricity-consumption.css";
import { ImPower } from "react-icons/im";
import { MdPriceChange } from "react-icons/md";
import { GiLevelTwo } from "react-icons/gi";
import { IoIosTimer } from "react-icons/io";
import BarChart from "../charts/bar-chart";
import { ElectricityLevelFormatter } from "../../model/enum/ElectricityLevel";
import { WidgetEnum } from "../../../model/widget-type";
import { ElectricityConfig } from "../../ElectricityWidget";
import { useDashboard } from "../../../../dashboard/dashboard-context";

const ElectricyConsumption: React.FC = () => {
  const [elecService, setElecService] = useState<ElviaService>();
  const [dynamicData, setData] = useState<ComponentData>();
  const { widgetConfigs } = useDashboard();
  const electricityConfig = (widgetConfigs[
    WidgetEnum.electricity
  ] as ElectricityConfig) ?? { electricityKey: "" };

  useEffect(() => {
    const setAndFetcConsumption = async () => {
      setElecService(await ElviaFetcher(electricityConfig.electricityKey));
    };
    setAndFetcConsumption();
  }, []);

  useEffect(() => setData(elecService?.getChartFormattedData()), [elecService]);

  useEffect(() => {
    const updateInterval = setInterval(
      () => {
        updateElectricityData();
      },
      60 * 60 * 1000,
    );

    return () => clearInterval(updateInterval);
  }, []);

  async function updateElectricityData() {
    try {
      const updatedElecData = await ElviaFetcher(
        electricityConfig.electricityKey,
      );
      setElecService(updatedElecData);
      if (updatedElecData) {
        setData(updatedElecData.getChartFormattedData());
      }
    } catch (error) {
      console.error("Can't update data:", error);
    }
  }

  return (
    <div className="h-column gap">
      <div className="consumption-cards h-row gap center">
        <div className="consumption-card">
          <ImPower className="react-icon-orange" />
          <div>{elecService?.getConsumptionMonth()} kwh</div>
        </div>
        <div className="consumption-card gap-tiny">
          <MdPriceChange className="react-icon-green" />
          <div>{elecService?.getEstimatedPriceMonth()} NOK</div>
        </div>
        <div className="consumption-card gap-tiny">
          <div className="level-header">
            <GiLevelTwo className="react-icon-orange" />{" "}
            {ElectricityLevelFormatter.formatLevel(
              elecService?.getCapacityLevel(),
            )}
          </div>
          <div className="font-small">
            {ElectricityLevelFormatter.formatInterval(
              elecService?.getCapacityLevel(),
            )}{" "}
            kwh
          </div>
        </div>
        <div className="consumption-card gap-tiny">
          <div className="level-header">
            <IoIosTimer className="react-icon-gray" />{" "}
            {moment(elecService?.getHighestHour()?.startTime).format("h a")}
          </div>
          <div className="font-small">
            {elecService?.getHighestHour()?.value} kwh
          </div>
        </div>
      </div>

      <div className="text-align-center font-small">
        Peak kwh per day in {moment().format("MMMM")}
        {dynamicData && (
          <BarChart
            chartData={dynamicData}
            title={`Highest avg kWh per day in ${moment().format("MMMM")}`}
            meanMax={elecService?.getMeanMaxLevel() ?? -1}
          />
        )}
      </div>
    </div>
  );
};

export default ElectricyConsumption;
