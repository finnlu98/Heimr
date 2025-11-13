
import configuration from "../Configuration"
import axios from "axios";
import { ElviaConsumptionResponse } from "../model/Deziarilize/Elvia/ElviaConsumptionResponse";
import { ElviaService } from "../services/ElviaService";


const ElviaFetcher = async () => {
    const consumptionEndpoint = configuration.getElviaConfig().Consumption.Endpoint;
    const secretToken = process.env.REACT_APP_ELVIA_SECRET_TOKEN ?? ""

    const response = await axios.get<ElviaConsumptionResponse>(consumptionEndpoint, {headers: {"Authorization": `Bearer ${secretToken}`, "Content-Type": "text/plain"}})

    const elviaService = new ElviaService(response.data);

    return elviaService;
}

export default ElviaFetcher