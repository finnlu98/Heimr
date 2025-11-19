import IFethcerEndpoint from "../Model/Interface/IFethcerEndpoint";
import BaseFetcher from "./BaseFetcher"
import axios from "axios";

export default class BaseFetcherEndpoint extends BaseFetcher implements IFethcerEndpoint {

    endpoint?: string;
    header?: object;

    async fetchData(): Promise<any> {
        if(this.endpoint && this.header) {
            return await axios.get(this.endpoint,  {headers: this.header})
        }
        
        if(this.endpoint)
            return await axios.get(this.endpoint);
    }

    setEndpoint(endpoint: string) {
        endpoint = endpoint.trim();
        this.endpoint = endpoint;
    }

    setHeader(header: object) {
        this.header = header
    }
}