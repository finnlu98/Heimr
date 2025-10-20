import moment from "moment";
import React, { useState, useEffect } from "react";
import "./bus-card.css";
import { FaBus } from "react-icons/fa";

function BusCard({
  tripIndex,
  name,
  publicCode,
  startTime,
  endTime,
  minutesUntil,
  calculateMinutesUntil,
  configColors,
  mainCard

}) {
  const [minutes, setMinutes] = useState(minutesUntil);
  const [badTime, setBadTime] = useState(evalBadTime(minutes));
  const [nameCleaned, setName] = useState(name)

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setMinutes(calculateMinutesUntil(startTime));
      setBadTime(evalBadTime(minutes));
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [startTime, calculateMinutesUntil]);

  useEffect(() => {
    setName(cleanName(nameCleaned)) 
  })


  function evalBadTime(time) {
    if (time > configColors.general) {
      return "general-time";
    }

    if (time > configColors.green) {
      return "good-time";
    }

    if (time > configColors.yellow) {
      return "medium-time";
    }
    return "bad-time";
  }

  function cleanName(name) {
    if (name.includes('/')) {
      const parts = name.split('/');
      
      return `${parts[0]}`;
    }
    
    return name;
  }

  function formatShowTime(minutes) {
    if(minutes < 10) {
      return minutes + " min"
    } else {
      return moment(startTime).format("HH:mm")
    }
  }

  return (
    <div key={tripIndex} className="bus-card card text-white mb-2 container">
      <div className="card-body">
        <div className="row">
          <div className="col-md-9 public">
            <div className="d-flex">
            <div className="public-icon">
                <FaBus />
              </div>
              <div className="public-header">
                <h5 className="card-title">
                  {nameCleaned} {publicCode}
                </h5>
              </div>
            </div>
          </div>

            <div className={`col-md-3 d-flex flex-column align-items-center minutes ${badTime}`}>
              <h5>{formatShowTime(minutes)}</h5>
            </div>

        </div>
      </div>
    </div>

  );
}

export default BusCard;

<div>
{ false ? (
  <div> True div </div>
) : (
  <div> False div</div>
)

}
</div>
