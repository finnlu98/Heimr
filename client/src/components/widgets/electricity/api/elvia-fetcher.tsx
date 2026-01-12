import configuration from "../../../../Configuration";
import apiClient from "../../../../api/ApiClient";
import { ElviaConsumptionResponse } from "../model/ElviaConsumptionResponse";
import { ElviaService } from "../services/ElviaService";
import moment from "moment";

const ElviaFetcher = async (secretToken: string) => {
  if (!secretToken || secretToken.trim() === "") {
    return;
  }

  const consumptionEndpoint = configuration.getElviaConfig().Consumption.Endpoint;
  const brokerEndpoint = "/broker";

  const formattedEndpoint = new URL(consumptionEndpoint);
  formattedEndpoint.searchParams.set("startTime", moment().startOf("month").format());

  const response = await apiClient.post<ElviaConsumptionResponse>(
    brokerEndpoint,
    { endpoint: formattedEndpoint.toString() },
    { headers: { "broker-authorization": `Bearer ${secretToken}` } },
  );
  const elviaService = new ElviaService(response.data);
  elviaService.getConsumptionToday();

  return elviaService;
};

export default ElviaFetcher;
