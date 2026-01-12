import moment, { Moment } from "moment";

export class Caches {
  caches: Set<Cache>;

  constructor() {
    this.caches = new Set();
  }

  getCache(key: string): Cache | undefined {
    for (let cache of this.caches) {
      if (cache.key === key) {
        return cache;
      }
    }
  }

  addCache(key: string, data: any): void {
    const cache = new Cache(key, moment(), data);
    this.caches.add(cache);
  }

  returnCache(key: string, TTL_MS: number): Cache | null {
    const cache = this.getCache(key);
    const cachedTime = cache?.ts;
    const cachedData = cache?.data;

    if (cachedData && cachedTime && moment().diff(cachedTime) < TTL_MS) {
      return cache;
    }

    return null;
  }
}

export class Cache {
  key: string;
  ts: Moment;
  data?: any;

  constructor(key: string, ts: Moment, data?: any) {
    this.key = key;
    this.ts = ts;
    this.data = data;
  }
}
