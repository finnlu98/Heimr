import axios from "axios";
import "dotenv/config";

export class ElectricityFetcher {
    endpoint: string
    token: string

    constructor() {
        this.endpoint = "https://elvia.azure-api.net/customer/metervalues/api/v1/metervalues"
        this.token = process.env.EXPRESS_APP_ELVIA_SECRET_TOKEN ?? "";
    }

    async GetElectricityConsumption() {
        var res = await axios.get(this.endpoint, {headers:{"Authorization": `Bearer ${this.token}`}})
        return res.data
    }
}