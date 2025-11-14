
import configuration from "../Configuration"
import axios from "axios";
import { ElviaConsumptionResponse } from "../model/Deziarilize/Elvia/ElviaConsumptionResponse";
import { ElviaService } from "../services/ElviaService";


const ElviaFetcher = async () => {
    const consumptionEndpoint = configuration.getElviaConfig();
    const response = await axios.get<ElviaConsumptionResponse>(consumptionEndpoint)
    const elviaService = new ElviaService(response.data);
    elviaService.getConsumptionToday();

    return elviaService;
}

export default ElviaFetcher