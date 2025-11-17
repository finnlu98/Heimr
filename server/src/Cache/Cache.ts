import { Moment } from "moment";

export default class Cache {
    ts?: Moment;
    data?: any

    setCache(ts: Moment, data: any) {
        this.ts = ts;
        this.data = data
    }
}