import BaseResponse from "../../../../api/model/BaseResponse"

export class StockResponse extends BaseResponse {
    stocks!: Stock[]
}

class Stock {
    symbol!: string
    fiftyDayAverageChangePercent!: string
}