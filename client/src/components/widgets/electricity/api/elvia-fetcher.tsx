import configuration from "../../../../Configuration";
import BaseWidgetApi from "../../core/api/BaseWidgetApi";
import { ElectricityData } from "../model/ElectricityData";
import { ElviaConsumptionResponse } from "../model/ElviaConsumptionResponse";
import { ElviaService } from "../services/ElviaService";
import moment from "moment";

class ElviaApi extends BaseWidgetApi {
  async fetchConsumptionData(): Promise<ElectricityData> {
    const consumptionEndpoint = configuration.getElviaConfig().Consumption.Endpoint;
    const brokerEndpoint = "/broker";
    const formattedEndpoint = new URL(consumptionEndpoint);
    formattedEndpoint.searchParams.set("startTime", moment().startOf("month").format());
    try {
      const response = await this.postInternalJson<ElviaConsumptionResponse>(
        brokerEndpoint,
        {},
        { endpoint: formattedEndpoint.toString(), integration: "Elvia" },
        "fetch-elvia-consumption",
      );

      const elecService = new ElviaService(response);
      return new ElectricityData(elecService);
    } catch (error) {
      console.error("Failed to fetch Elvia consumption data", error);
      throw error;
    }
  }

  async postElviaKey(key: string): Promise<void> {
    const formatKey = `Bearer ${key.trim()}`;
    await this.postInternalJson("/integration", { provider: "Elvia", key: formatKey }, {}, "post-elvia-key");
  }

  async getHasElviaKey(): Promise<boolean> {
    try {
      const res = await this.getInternalJson<{ integration: string | null }>("/integration", {
        params: { provider: "Elvia" },
        meta: {
          loadingKey: "has-elvia-key",
          errorMessage: "Failed to get Elvia key status",
        },
      });
      return res.integration !== null;
    } catch (error) {
      console.error("Failed to get Elvia key status", error);
      return false;
    }
  }
}

const elviaApi = new ElviaApi();
export default elviaApi;
