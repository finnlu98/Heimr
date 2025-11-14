import axios from "axios";
import "dotenv/config";
import appConfig from "../../AppConfig";
import moment from "moment";

export class ElectricityFetcher {
    endpoint: string
    token: string
    header: object
    monthlyCache: Map<string, { ts: number; data: any }> 
    private readonly TTL_MS = 60 * 60_000

    constructor() {
        this.endpoint = appConfig.getElviaEndpoint();
        this.token = process.env.EXPRESS_APP_ELVIA_SECRET_TOKEN ?? "";
        this.header = {headers:{"Authorization": `Bearer ${this.token}`}}
        this.monthlyCache = new Map<string, { ts: number; data: any }>();
    }

    async FetchElectricityData(endpoint: string) {
        return await axios.get(endpoint, this.header)
    }

    async GetCurrentConsumption() {
        var res = await this.FetchElectricityData(this.endpoint);
        return res.data
    }

    // Todo: fix standardized helper for cache
    async GetCurrentMonthConsumption() {
        var startDate = moment().startOf('month').format();
        var endpoint = `${this.endpoint}?startTime=${startDate}`

        const cacheKey = `consumption:${startDate}`;
        const cached = this.monthlyCache.get(cacheKey);

        if (cached && (Date.now() - cached.ts) < this.TTL_MS) {
            return cached.data;
        }

        var res = await this.FetchElectricityData(endpoint);

        this.monthlyCache = new Map<string, { ts: number; data: any }>();

        this.monthlyCache.set(cacheKey, {
            ts: Date.now(),
            data: res.data
        });

        return res.data
    }

    async GetMaxHours() {

    }
}