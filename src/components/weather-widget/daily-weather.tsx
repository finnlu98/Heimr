import React, { useState, useEffect }  from 'react';

import './daily-weather.css'

const Dailyweather : React.FC = () => {

  const [widget, setWidget] = useState("https://www.yr.no/nb/innhold/1-72837/card.html")

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setWidget("https://www.yr.no/nb/innhold/1-72837/card.html");
    }, 1000*60);

    return () => clearInterval(countdownInterval);
  }, [widget]);


  return (
    <div className='weather-widget'>
      <iframe
        title="Weather Widget"
        src={widget}
        width="100%"
        height="420px"
      />
    </div>
  );
};

export default Dailyweather;
