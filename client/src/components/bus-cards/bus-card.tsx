import moment from "moment";
import React, { useState, useEffect, useCallback } from "react";
import "./bus-card.css";
import { FaBus } from "react-icons/fa";
import { ConfigColor } from "./ConfigColor";

interface BusCardProps {
  name: string
  publicCode: string
  startTime: string
  minutesUntil: number
  calculateMinutesUntil: (startTime: string) => number
  configColor: ConfigColor
}


const BusCard: React.FC<BusCardProps> = ({
  name,
  publicCode,
  startTime,
  minutesUntil,
  calculateMinutesUntil,
  configColor,
}) => {
  const [minutes, setMinutes] = useState<number>(minutesUntil);
  const [badTime, setBadTime] = useState<string>();
  const [nameCleaned, setName] = useState(name)
  
  const evalBadTimeCallback = useCallback((time: number) => {
    let timeClass = "bad-time";

    if (time > configColor.yellow) 
      timeClass = "medium-time";

    if (time > configColor.green) 
      timeClass = "good-time";
    
    if (time > configColor.general)
      timeClass = "general-time";

    setBadTime(timeClass);
  }, [configColor])

  useEffect(() => evalBadTimeCallback(minutes))

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setMinutes(calculateMinutesUntil(startTime));
      evalBadTimeCallback(minutes)
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [startTime, minutes, calculateMinutesUntil, evalBadTimeCallback]);

  useEffect(() => {
    setName(cleanName(nameCleaned)) 
  }, [nameCleaned, setName])


  function cleanName(name : string) {
    if (name.includes('/')) {
      const parts = name.split('/');
      
      return `${parts[0]}`;
    }
    
    return name;
  }

  function formatShowTime(minutes: number) {
    if(minutes < 10) {
      return minutes + " min"
    } else {
      return moment(startTime).format("HH:mm")
    }
  }

  return (
    <div className="bus-card">
        <div>{formatShowTime(minutes)}</div>
        {/* <div className="row">
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
        </div> */}
    </div>

  );
}

export default BusCard;
