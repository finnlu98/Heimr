import moment from "moment";
import React, { useState, useEffect, useCallback } from "react";
import "./bus-card.css";
import { ConfigColor } from "./ConfigColor";

interface BusCardProps {
  name: string
  startTime: string
  minutesUntil: number
  calculateMinutesUntil: (startTime: string) => number
  configColor: ConfigColor
}


const BusCard: React.FC<BusCardProps> = ({
  name,
  startTime,
  minutesUntil,
  calculateMinutesUntil,
  configColor,
}) => {
  const [minutes, setMinutes] = useState<number>(minutesUntil);
  const [nameCleaned, setName] = useState(name)
  
  const evalBadTimeCallback = useCallback((time: number) => {
    let timeClass = "bad-time";

    if (time > configColor.yellow) 
      timeClass = "medium-time";

    if (time > configColor.green) 
      timeClass = "good-time";
    
    if (time > configColor.general)
      timeClass = "general-time";

    return timeClass

  }, [configColor])

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
    </div>

  );
}

export default BusCard;
