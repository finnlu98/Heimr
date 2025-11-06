import React, { useState, useEffect }  from 'react';

import './daily-weather.css'
import DailyweatherRow from './daily-weather-row';
import FetchWeather from '../../api/weather-fetcher';
import { WeatherForecast } from '../../model/data/WeatherForecast';

const Dailyweather : React.FC = () => {

  const [weatherForecast, setWeatherForecast] = useState<WeatherForecast>()

  useEffect(() => {
    const CallFetchWeather = async () => {
      const weatherResponse = await FetchWeather();
      setWeatherForecast(weatherResponse);
      
    }

    CallFetchWeather();
  }, [])



  return (
    <div className='weather-widget'>
      <div className='main-widget'>
        <img src={`./img/weather/icons/${weatherForecast?.symbol_code}.svg`} alt="Logo" className='main-icon'/>
        <div className='main-temp'>{weatherForecast?.air_temperature}°</div>
        <div className='main-rain'>{weatherForecast?.precipitation_amount} mm</div>

      </div>
      <div className='secondary-widget'>
          {weatherForecast && weatherForecast.forecast_next_hours.map((forecast_next_hour) => {
            return <DailyweatherRow 
                      time={forecast_next_hour.intervall} 
                      degree={forecast_next_hour.air_temperature} 
                      rain={forecast_next_hour.precipitation_amount}
                      icon={forecast_next_hour.symbol_code}/>
          })}
        </div>

        
    </div>
  );
};

export default Dailyweather;
