import moment from "moment";
import "./electricity-consumption.css";
import { ImPower } from "react-icons/im";
import { MdPriceChange } from "react-icons/md";
import { GiLevelTwo } from "react-icons/gi";
import { IoIosTimer } from "react-icons/io";
import BarChart from "../charts/bar-chart";
import { ElectricityLevelFormatter } from "../../model/enum/ElectricityLevel";
import { useElectricityConsumption } from "../../context/ElectricityContext";
import EditWidget from "../../../core/components/EditWidget";
import { WidgetEnum } from "../../../model/widget-type";

const ElectricyConsumption: React.FC = () => {
  const { elviaService, chartFormattedData, hasElviaKey } = useElectricityConsumption();
  return (
    <>
      {!hasElviaKey ? (
        <div className="h-column gap center">
          <EditWidget widgetKey={WidgetEnum.electricity} />
        </div>
      ) : (
        <div className="h-column gap">
          <div className="consumption-cards h-row gap center">
            <div className="consumption-card">
              <ImPower className="react-icon-orange" />
              <div>{elviaService?.getConsumptionMonth()} kwh</div>
            </div>
            <div className="consumption-card gap-tiny">
              <MdPriceChange className="react-icon-green" />
              <div>{elviaService?.getEstimatedPriceMonth()} NOK</div>
            </div>
            <div className="consumption-card gap-tiny">
              <div className="level-header">
                <GiLevelTwo className="react-icon-orange" />{" "}
                {ElectricityLevelFormatter.formatLevel(elviaService?.getCapacityLevel())}
              </div>
              <div className="font-small">
                {ElectricityLevelFormatter.formatInterval(elviaService?.getCapacityLevel())} kwh
              </div>
            </div>
            <div className="consumption-card gap-tiny">
              <div className="level-header">
                <IoIosTimer className="react-icon-gray" />{" "}
                {moment(elviaService?.getHighestHour()?.startTime).format("h a")}
              </div>
              <div className="font-small">{elviaService?.getHighestHour()?.value} kwh</div>
            </div>
          </div>

          <div className="text-align-center font-small">
            Peak kwh per day in {moment().format("MMMM")}
            {chartFormattedData && (
              <BarChart
                chartData={chartFormattedData}
                title={`Highest avg kWh per day in ${moment().format("MMMM")}`}
                meanMax={elviaService?.getMeanMaxLevel() ?? -1}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ElectricyConsumption;
