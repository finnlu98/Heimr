import { IoAddCircle } from "react-icons/io5";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { StocksConfig } from "../../StocksWidget";
import { useDashboard } from "../../../../core/dashboard/dashboard-context";
import { WidgetEnum } from "../../../core/model/widget-type";

const StocksConfiguration: React.FC = () => {
  const { widgetConfigs, setWidgetConfig } = useDashboard();
  const config = (widgetConfigs[WidgetEnum.stocks] as StocksConfig) ?? {
    tickers: [],
  };
  const [newTicker, setNewTicker] = useState("");

  function handleAddTicker() {
    if (newTicker.trim() === "") return;
    const updatedTickers = [...(config.tickers || []), newTicker.trim().toUpperCase()];
    setWidgetConfig(WidgetEnum.stocks, {
      ...config,
      tickers: updatedTickers,
    });
    setNewTicker("");
  }

  function handleRemoveTicker(ticker: string) {
    const updatedTickers = config.tickers.filter((t) => t !== ticker);
    setWidgetConfig(WidgetEnum.stocks, { ...config, tickers: updatedTickers });
  }

  return (
    <div className="h-column">
      <label htmlFor="stockSymbols">Stock Symbols:</label>
      {config?.tickers?.map((symbol, index) => (
        <div className="h-row">
          <div key={index}>{symbol}</div>
          <div className="right-align" onClick={() => handleRemoveTicker(symbol)}>
            <MdDelete size={20} />
          </div>
        </div>
      ))}
      <div className="h-row">
        <input type="text" placeholder="Ticker" value={newTicker} onChange={(e) => setNewTicker(e.target.value)} />
        <div className="right-align">
          <IoAddCircle size={20} onClick={handleAddTicker} />
        </div>
      </div>
    </div>
  );
};

export default StocksConfiguration;
