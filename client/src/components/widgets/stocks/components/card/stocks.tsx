import { useEffect, useState } from "react";
import "./stocks.css";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { IoMdArrowDropup } from "react-icons/io";
import StockFetcher from "../../api/stock-fetcher";
import { StockResponse } from "../../model/StockResponse";
import { useDashboard } from "../../../../dashboard/dashboard-context";
import { WidgetEnum } from "../../../model/widget-type";
import { StocksConfig } from "../../StocksWidget";

const Stocks: React.FC = () => {
  const [stocks, setStocks] = useState<StockResponse>();
  const { widgetConfigs } = useDashboard();
  const config = (widgetConfigs[WidgetEnum.stocks] as StocksConfig) ?? {
    tickers: [],
  };
  useEffect(() => {
    const setAndFetchStocks = async () =>
      setStocks(await StockFetcher(config.tickers));
    setAndFetchStocks();
  }, []);

  function formatPercantage(perc: string) {
    const value = Number(perc);
    if (isNaN(value)) return "N/A";

    const f = `${(value * 100).toFixed(2)}%`;
    if (value >= 0) {
      return (
        <div className="change pos">
          {" "}
          {f} <IoMdArrowDropup fill="rgba(55, 187, 3, 1)" size={20} />
        </div>
      );
    }
    return (
      <div className="change">
        {" "}
        {f} <MdOutlineArrowDropDown fill="rgb(255, 95, 3)" size={20} />
      </div>
    );
  }

  return (
    <div className="stocks">
      {stocks &&
        stocks.stocks.map((stock) => {
          return (
            <div key={stock.symbol} className="stock">
              <div className="ticker">{stock.symbol}:</div>
              {formatPercantage(stock.fiftyDayAverageChangePercent)}
            </div>
          );
        })}
    </div>
  );
};

export default Stocks;
