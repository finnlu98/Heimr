import { Moment } from "moment";

export default class CacheItem<T> {
    ts!: Moment
    data!: T
  
}