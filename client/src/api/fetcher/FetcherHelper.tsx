import BaseResponse from "../../model/Deziarilize/Common/BaseResponse"
import moment from "moment";
import CacheItem from "../../model/Deziarilize/Common/CacheItem";

export default class FetcherHelper<T extends BaseResponse> {

    private TTL_MS: number;

    constructor(TTL_MS: number) {
        this.TTL_MS = TTL_MS
    }

    private getCache(key: string): CacheItem<T> | undefined {
        var raw = localStorage.getItem(key)

        if(!raw) return undefined;

        const cached: CacheItem<T> = JSON.parse(raw);
        return cached
    }

    private setCache(key: string, item: T) {
        localStorage.removeItem(key);
        
        const cached: CacheItem<T> = {
            ts: moment(),
            data: item,
        };
        
        return localStorage.setItem(key, JSON.stringify(cached))
    }

    async getData(key: string, req: () => Promise<T>): Promise<T> {
        
        var cache = this.getCache(key);

        if(cache && cache.ts && cache.data && moment().diff(cache.ts) < this.TTL_MS) {
            return cache.data
        }

        var res = await req();
        this.setCache(key, res)

        return await req()
    }
}