import IFetcher from "../Model/Interface/IFetcher";
import Cache from "../../Cache/Cache";
import moment from "moment";

export default abstract class BaseFetcher implements IFetcher {
    
    cache: Cache 
    TTL_MS: number

    constructor(cacheLength: number) {
        this.TTL_MS = cacheLength;
        this.cache = new Cache()
    }

    abstract fetchData(): Promise<any>

    async getData(): Promise<any> {
        if (this.returnCache()) {
            console.log(`Returning cached request`)
            return this.cache.data;

        }

        console.log(`Sending request to get data`)
        var res = await this.fetchData()
        if (res && "data" in res) {
            this.cache.setCache(moment(), res.data);
            return res.data;
        }

        this.cache.setCache(moment(), res);
        return res;
    }

    returnCache(): boolean {
        const cachedTime = this.cache?.ts;
        const cachedData = this.cache?.data;
        return cachedData && cachedTime && moment().diff(cachedTime) < this.TTL_MS
    }

    
}