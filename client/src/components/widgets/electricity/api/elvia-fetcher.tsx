import configuration from "../../../../Configuration";
import axios from "axios";
import { ElviaConsumptionResponse } from "../model/ElviaConsumptionResponse";
import { ElviaService } from "../services/ElviaService";
import moment from "moment";


const ElviaFetcher = async () => {
    const consumptionEndpoint = configuration.getElviaConfig().Consumption.Endpoint;
    const secretToken = process.env.REACT_APP_ELVIA_SECRET_TOKEN ?? ""
    var brokerEndpoint = process.env.REACT_APP_HEIMR_ENDPOINT ?? ""
    brokerEndpoint = brokerEndpoint + "broker"

    const formattedEndpoint = new URL(consumptionEndpoint)
    formattedEndpoint.searchParams.set("startTime", moment().startOf('month').format())

    const response = await axios.post<ElviaConsumptionResponse>(
        brokerEndpoint,
        { endpoint: formattedEndpoint.toString() },            
        { headers: { "broker-authorization": `Bearer ${secretToken}` } } 
    );
    const elviaService = new ElviaService(response.data);
    elviaService.getConsumptionToday();

    return elviaService;
}


export default ElviaFetcher