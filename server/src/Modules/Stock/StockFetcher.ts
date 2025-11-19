import BaseFetcher from "../Common/BaseFetcher";
import YahooFinance from "yahoo-finance2";

export default class StockFetcher extends BaseFetcher {
    
    tickers: string[]
    constructor(cacheLength: number) {
        super(cacheLength)
        this.tickers = []
    }
    
    async fetchData(): Promise<any> {
        const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] });
        
        if(this.tickers) {
            return await yahooFinance.quote(this.tickers);
        }

        return {};
    }

    setTickers(tickers: string[]) {
        this.tickers = tickers;
    }

}