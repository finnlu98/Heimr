import { useEffect } from "react";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header/header";
import Dailyweather from "./components/widgets/weather/daily-weather";
import LaundryWeek from "./components/widgets/laundry-week/laundry-week";
import Calender from "./components/widgets/calender/calender";
import ElectricyConsumption from "./components/widgets/electricity/components/electricity-consumption/electricity-consumption";
import TravelCard from "./components/widgets/bus-cards/components/travel-card";
import CityBike from "./components/widgets/city-bike/city-bike";
import News from "./components/widgets/news/news";
import KanyeQoute from "./components/standalone/kanye-quote/kanye-quote";
import HomeActionButtons from "./components/widgets/home/home-action-buttons";

import "./App.css";
import "./styles/global.css"
import "./styles/colors.css"
import "./styles/widgets.css"
import 'leaflet/dist/leaflet.css';


function App() {
  const reloadHour = 5;
  const reloadMinute = 30;

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
              <div className="col-12">
                <div className="widget-container">
                  <HomeActionButtons /> 
                </div>
              </div>
              <div className="col-12" >
                <div className="widget-container">
                  <TravelCard />
                </div>
              </div>
              <div className="col-12">
                <div className="widget-container">
                  <Dailyweather />
                </div>
              </div>
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
                  <CityBike />
                </div>
              </div>
              <div className="col-12">
                <div className="widget-container">
                  <News />
                </div>
              </div>
              
              <div className="col-12">
                <div className="widget-container">
                  <Calender />
                </div>
              </div>
              <div className="col-12">
                <div className="widget-container">
                  <LaundryWeek />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Footer">
        <KanyeQoute />
      </div>
    </div>
  );
}

export default App;
