import "./stocks.css"
import { MdOutlineArrowDropDown } from "react-icons/md";
import { IoMdArrowDropup } from "react-icons/io";
import { useEffect, useState } from "react";
import { StockResponse } from "../../model/Deziarilize/StockResponse";
import StockFetcher from "../../api/stock-fetcher";

// Add percentage today
const Stocks: React.FC = () => {
    const [stocks, setStocks] = useState<StockResponse>()
    useEffect(() => {
        const setAndFetchStocks = async () => setStocks(await StockFetcher()) 
        setAndFetchStocks()
    }, [])

    function formatPercantage(perc: string) {
        const value = Number(perc);
        if (isNaN(value)) return "N/A";

        const f = `${(value * 100).toFixed(2)}%`
        if(value >= 0) {
            return  <div className="change pos"> {f} <IoMdArrowDropup fill="rgba(55, 187, 3, 1)" size={20}/></div> ;
        } 


        return <div className="change"> {f} <MdOutlineArrowDropDown fill="rgb(255, 95, 3)" size={20}/></div> ;
    }

    return (
        <div className="stocks">
            {stocks && stocks.stocks.map((stock) => {
                return (
                <div className="stock"> 
                    <div className="ticker">{stock.symbol}:</div>
                    {formatPercantage(stock.fiftyDayAverageChangePercent)} 
                </div>
                )
            })}
        </div>
    )
}

export default Stocks