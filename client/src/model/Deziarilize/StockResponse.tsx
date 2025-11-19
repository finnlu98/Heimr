import BaseResponse from "./Common/BaseResponse";

export class StockResponse extends BaseResponse {
    stocks!: Stock[]
}

class Stock {
    symbol!: string
    fiftyDayAverageChangePercent!: string
}