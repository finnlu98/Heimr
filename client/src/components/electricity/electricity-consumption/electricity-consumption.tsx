import { useEffect, useState } from "react"
import ElviaFetcher from "../../../api/elvia-fetcher"
import { ElviaService } from "../../../services/ElviaService"
import { ComponentData } from "../../../model/Deziarilize/ElectricityPrices";
import moment from "moment";
import "./electricity-consumption.css"
import { ImPower } from "react-icons/im";
import { setDatasets } from "react-chartjs-2/dist/utils";
import BarChart from "../charts/bar-chart";

const ElectricyConsumption: React.FC = () => {
    const [elecService, setElecService] = useState<ElviaService>();
    const [dynamicData, setData] = useState<ComponentData>();

    useEffect(() => {
        const setAndFetcConsumption = async () => {
            setElecService(await ElviaFetcher());
        }
        setAndFetcConsumption();
    }, [])

    useEffect(() => setData(elecService?.getChartFormattedData()), [elecService])
    

    return (
        <div className="consumption-container">
            <div className="consumption-cards">
                <div className="consumption-card">
                    <ImPower fill="#f3a71aff" />
                    <div>
                    {elecService?.getConsumptionToday()} kwh
                    </div>
                </div>
                <div className="consumption-card">
                    <div>
                        Highest at {moment(elecService?.getHighestHour()?.startTime).format("h a")}
                    </div>
                    <div className="card-sub-text">
                        {elecService?.getHighestHour()?.value} kwh
                    </div>
                </div>
                <div className="consumption-card">
                    <div>Level 2</div>
                    <div className="card-sub-text">2-5 kWh/h, 190 nok</div>
                </div>
            </div>
            <div>
                {dynamicData && (
                    <BarChart chartData={dynamicData} title={`Highest avg kWh per day in ${moment().format("MMMM")}`} />
                )} 
            </div>
        </div>
    )
}

export default ElectricyConsumption