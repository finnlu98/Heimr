import moment from "moment";
import BusCard from "./bus-card";
import React, { useState, useEffect, useRef } from "react";
import "./bus-cards.css";
import { TripPatterns } from "../model/TravelResponse";
import { Mode } from "../model/enum/Mode";
import { ConfigColor } from "./ConfigColor";
import FetchBustimes from "../api/bus-time-fetcher";
import { v4 as uuidv4 } from "uuid";
import ImageCircle from "../../../shared/imageCirlce/ImageCircle";



interface BusCardsProps {
  title: string,
  imgPath: string
  startPlace: string
  stopPlace: string
  configCard: {
    numRows: number,
    minFilter: number
  },
  configColor: ConfigColor
}

const BusCards: React.FC<BusCardsProps> = ({ title, imgPath, startPlace, stopPlace, configCard, configColor }) => {
  
  const { numRows, minFilter } = configCard;
  
  const [tripPatterns, settripPatterns] = useState<TripPatterns[]>();
  const idRef = useRef(uuidv4());
 
  useEffect(() => {
    const fetchAndFilter = async () => {
    var busTimes = await FetchBustimes(idRef.current, startPlace, stopPlace)
    settripPatterns(filterBusRides(busTimes.data.trip.tripPatterns));
    
  };
    fetchAndFilter();
  }, [])

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      
      var filteredBusTimes = filterBusRides(tripPatterns)
      if(filteredBusTimes.length !== 0)
        settripPatterns(filteredBusTimes);
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  useEffect(() => {
    const updateInterval = setInterval(() => {
      updateTravelData();
    }, 7 * 60 * 1000);

    return () => clearInterval(updateInterval);
  }, []);

  async function updateTravelData() {
    try {
        const updatedTravelData = await FetchBustimes(idRef.current, startPlace, stopPlace);
        settripPatterns(filterBusRides(updatedTravelData.data.trip.tripPatterns));
      } catch (error) {
       console.error("Can't update data:", error);
     }
  }

  function filterBusRides(tripPatterns: TripPatterns[] | undefined): TripPatterns[] {
    if (tripPatterns === undefined || !tripPatterns) 
      return [];
    
    return tripPatterns
      .map((tripPattern) => ({
        ...tripPattern,
        legs: tripPattern.legs.filter(
          (leg) =>
            Object.values(Mode).includes(leg.mode.toUpperCase() as Mode) &&
            calculateMinutesUntil(leg.expectedStartTime) >= minFilter
        ),
      }))
      .filter((tripPattern) => tripPattern.legs.length === 1);
  }

  function calculateMinutesUntil(startTime : string) {
    const now = moment().utc();
    const tripStartTime = moment(startTime).utc();
    const diffInMinutes = tripStartTime.diff(now, "minutes");
    return diffInMinutes;
  }



  return (
    <div className="bus-cards">
          <ImageCircle imgPath={`./img/bus-card/${imgPath}`} alt="Bus stop arrival" />
          {tripPatterns && tripPatterns.slice(0, numRows).map((tripPattern) => {
            return (
              <BusCard
                key={tripPattern.legs[0].expectedStartTime}
                name={tripPattern.legs[0].line.name.split(" ")[0]}
                startTime={tripPattern.legs[0].expectedStartTime}
                minutesUntil={calculateMinutesUntil(
                  tripPattern.legs[0].expectedStartTime
                )}
                calculateMinutesUntil={calculateMinutesUntil}
                configColor={configColor}
              />
            );
          })}
    </div>
  );
}

export default BusCards;
