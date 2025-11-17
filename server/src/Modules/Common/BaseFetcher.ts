import IFetcher from "../Model/Interface/IFetcher";
import axios from "axios";
import Cache from "../../Cache/Cache";
import moment from "moment";

export default class BaseFetcher implements IFetcher {
    
    cache: Cache 
    TTL_MS: number
    endpoint?: string;
    header?: object;

    constructor(cacheLength: number) {
        this.TTL_MS = cacheLength;
        this.cache = new Cache()
    }

    async fetchData(): Promise<any> {
        if(this.endpoint && this.header) {
            return await axios.get(this.endpoint,  {headers: this.header})
        }
        
        if(this.endpoint)
            return await axios.get(this.endpoint);
    }

    async getData(): Promise<any> {
        if (this.returnCache()) 
            return this.cache.data;
        
        var res = await this.fetchData()
        this.cache.setCache(moment(), res.data)

        return res.data;
    }

    returnCache(): boolean {
        const cachedTime = this.cache?.ts;
        const cachedData = this.cache?.data;
        return cachedData && cachedTime && moment().diff(cachedTime) < this.TTL_MS
    }

    setEndpoint(endpoint: string) {
        endpoint = endpoint.trim();
        this.endpoint = endpoint;
    }

    setHeader(header: object) {
        this.header = header
    }
}