import { useState, useEffect } from "react";
import moment from "moment";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BusCards from "./components/bus-cards/bus-cards";
import { TailSpin } from "react-loader-spinner";
import Header from "./components/header/header";
import Dailyweather from "./components/weather/daily-weather";
import ElectrictyPrices from "./components/electricity/electricity-prices/electricity-prices";
import LaundryWeek from "./components/laundry-week/laundry-week";
import Configuration from "./Configuration";
import Calender from "./components/calender/calender";
import ElectricyConsumption from "./components/electricity/electricity-consumption/electricity-consumption";
function App() {

  const [loading, setLoading] = useState(true);

  const reloadHour = 5;
  const reloadMinute = 30;

  const fetchandSetData = async () => {
    try {
      // Logikk for å si ifra at vi er ferdig lastet :D

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchandSetData();
  }, []);

  useEffect(() => {
    const shouldReload = () => {
      const now = moment();
      return (
        now.hour() === reloadHour &&
        now.minute() === reloadMinute &&
        now.second() === 0
      );
    };

    const reloadAtTargetHour = () => {
      if (shouldReload()) {
        window.location.reload();
      }
    };

    reloadAtTargetHour();

    const intervalId = setInterval(reloadAtTargetHour, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div>
          <TailSpin
            height="150"
            width="150"
            color="lightblue"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          <div className="mt-4">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container mt-2 mb-2">
        <div className="row">
          <div className="col-12 mt-2">
            <Header />
          </div>
        </div>

        <div className="row g-2">
          <div className="col-md-7">
            <div className="row g-2">
              {Configuration.getBusStopConfigs().map((busStop) => (
                <div className="col-12" key={busStop.title}>
                  <div className="widget-container">
                    <BusCards
                      title={busStop.title}
                      startPlace={busStop.startPlace}
                      stopPlace={busStop.stopPlace}
                      configCard={busStop.configCard}
                      configColor={busStop.configColor}
                    />
                  </div>
                </div>
              ))}
              <div className="col-12">
                <div className="widget-container">
                  <ElectricyConsumption />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <div className="row g-2">
              <div className="col-12">
                <div className="widget-container">
                  <Dailyweather />
                </div>
              </div>
              <div className="col-12">
                <div className="widget-container">
                  <Calender />
                </div>
              </div>
              {/* <div className="col-12">
                <div className="widget-container">
                  <ElectrictyPrices />
                </div>
              </div> */}
              <div className="col-12">
                <div className="widget-container">
                  <LaundryWeek />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
