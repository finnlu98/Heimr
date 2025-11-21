import BaseResponse from "./model/BaseResponse";
import moment from "moment";
import CacheItem from "./model/CacheItem";
import { XMLParser } from "fast-xml-parser";

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

    private returnCache(key: string): T | undefined {
        var cache = this.getCache(key);

        if(cache && cache.ts && cache.data && moment().diff(cache.ts) < this.TTL_MS) {
            return cache.data
        }
        
        return undefined
    }

    async getData(key: string, req: () => Promise<T>): Promise<T> {
        
        const cache = this.returnCache(key);
        if(cache) return cache;

        var res = await req();
        this.setCache(key, res)

        return res;
    }

    async getXmlData(key: string, req: () => Promise<any>): Promise<T> {
        const cache = this.returnCache(key);
        if(cache) return cache;

        var res = await req();

        const parser = new XMLParser({
            ignoreAttributes: false, 
            attributeNamePrefix: "@_",
            transformTagName: (tagName) =>
                tagName.replace(/:/g, "_"), // safety if colons remain (media:content -> media_content)
            transformAttributeName: (attrName) =>
                attrName.replace(/^@_/, "")
        });

        const json: T = parser.parse(res)
        this.setCache(key, json)

        return json
    }
}