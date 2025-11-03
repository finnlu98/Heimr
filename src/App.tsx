import React, { useState, useEffect } from "react";
import moment from "moment";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BusCards from "./components/bus-cards/bus-cards";
import { TailSpin } from "react-loader-spinner";
import Header from "./components/header/header";
import Dailyweather from "./components/weather-widget/daily-weather";
import ElectrictyPrices from "./components/electricity-prices/electricity-prices";
import LaundryWeek from "./components/laundry-week/laundry-week";

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
      <div className="dash-container container mt-2 mb-4">
        <div className="row">
          <Header />
        </div>

        <div className="row dash-rows">
          <div className="col-md-7 col-12">
            <div className="mb-2">
              {<BusCards 
                title={"St. Hanshaugen - Solli"} 
                startPlace="NSR:StopPlace:6274"
                stopPlace="NSR:StopPlace:62019"
                configCard={{
                  numRows: 4, 
                  minFilter: 3
                }} 
                configColor={{
                  general: 8, 
                  green: 6, 
                  yellow: 4}} />}
            </div>
            <div>
              {<BusCards 
                title={"Frydenlund - Jon Collets vei"} 
                startPlace="NSR:StopPlace:6258"
                stopPlace="NSR:StopPlace:6323"
                configCard={{numRows: 4, minFilter: 1}} 
                configColor={{
                  general: 8, 
                  green: 6, 
                  yellow: 4}}/>}
            </div>            
          </div>
          
          <div className="col-md-5 col-12">
            <div className="row mb-2">
              <Dailyweather />
            </div>
            <div className="row mb-2">
              <ElectrictyPrices/>
            </div>
            <div className="row mb-2">
              <LaundryWeek />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
