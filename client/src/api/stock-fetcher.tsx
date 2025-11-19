import configuration from "../Configuration";
import axios from "axios";
import { StockResponse } from "../model/Deziarilize/StockResponse";

const StockFetcher = async () => {
    try {

        const config = configuration.getStockConfig()
        const endpoint = process.env.REACT_APP_STOCK_ENDPOINT ?? ""
        const res = await axios.post<StockResponse>(endpoint, { tickers: config.Tickers })
        console.log(res.data.stocks)
        return res.data;

    } catch (error) {
        console.error("Can't get stock data");
        throw error;
    }

}

export default StockFetcher