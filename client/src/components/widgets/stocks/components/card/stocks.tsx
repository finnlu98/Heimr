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
        <div className="change h-row pos">
          {" "}
          {f} <IoMdArrowDropup size={20} />
        </div>
      );
    }
    return (
      <div className="change h-row">
        {" "}
        {f} <MdOutlineArrowDropDown size={20} />
      </div>
    );
  }

  return (
    <div className="h-row font-small font-bold">
      {stocks &&
        stocks.stocks.map((stock) => {
          return (
            <div key={stock.symbol} className="stock h-column">
              <div>{stock.symbol}:</div>
              {formatPercantage(stock.fiftyDayAverageChangePercent)}
            </div>
          );
        })}
    </div>
  );
};

export default Stocks;
