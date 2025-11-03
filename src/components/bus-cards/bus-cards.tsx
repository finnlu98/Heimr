import moment from "moment";
import BusCard from "./bus-card";
import React, { useState, useEffect } from "react";
import "./bus-cards.css";
import TravelResponse from "../../model/Deziarilize/TravelResponse";
import { Mode } from "../../model/data/Enum/Mode";
import { ConfigColor } from "./ConfigColor";
import FetchBustimes from "../../api/fetchers/bus-time-fetcher";

interface BusCardsProps {
  title: string,
  startPlace: string
  stopPlace: string
  configCard: {
    numRows: number,
    minFilter: number
  },
  configColor: ConfigColor
}

const BusCards: React.FC<BusCardsProps> = ({ title, startPlace, stopPlace, configCard, configColor }) => {
  
  const { numRows, minFilter } = configCard;
  
  const [tripPatterns, settripPatterns] = useState<TravelResponse>();
 
  useEffect(() => {
    const fetchAndFilter = async () => {
    settripPatterns(filterBusRides(await FetchBustimes(startPlace, stopPlace)));
    
  };
    fetchAndFilter();
  }, [])

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      settripPatterns((prevTripPatterns) => filterBusRides(prevTripPatterns));
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [tripPatterns]);

  useEffect(() => {
    const updateInterval = setInterval(() => {
      updateTravelData();
    }, 7 * 60 * 1000);

    return () => clearInterval(updateInterval);
  }, []);


  function filterBusRides(tripPatterns: TravelResponse | undefined): TravelResponse {

    if(tripPatterns === undefined)
      return new TravelResponse();

    tripPatterns.data.trip.tripPatterns = tripPatterns.data.trip.tripPatterns
      .map((tripPattern) => ({
        ...tripPattern,
        legs: tripPattern.legs.filter(
          (leg) =>
            Object.values(Mode).includes(leg.mode.toLocaleUpperCase() as Mode)    &&
            calculateMinutesUntil(leg.expectedStartTime) >= minFilter
        ),
      }))
      .filter((tripPattern) => tripPattern.legs.length === 1);

    return tripPatterns
  }

  function calculateMinutesUntil(startTime : string) {
    const now = moment().utc();
    const tripStartTime = moment(startTime).utc();
    const diffInMinutes = tripStartTime.diff(now, "minutes");
    return diffInMinutes;
  }

  
  async function updateTravelData() {
    try {
      const updatedTravelData = await FetchBustimes(startPlace, stopPlace);
      settripPatterns(filterBusRides(updatedTravelData));
    } catch (error) {
      console.error("Can't update data:", error);
    }
  }

  return (
    <div>
    <div className="bus-card-contianter">
      <div className="busstider-header mb-2">
          <h5><strong>{title}</strong></h5>
        </div>
        
        <div>
          {tripPatterns?.data.trip.tripPatterns.slice(0, numRows).map((tripPattern, tripIndex) => {
            return (
              <BusCard
                key={tripIndex}
                name={tripPattern.legs[0].line.name.split(" ")[0]}
                publicCode={tripPattern.legs[0].line.publicCode}
                startTime={tripPattern.legs[0].expectedStartTime}
                tripIndex={tripIndex}
                minutesUntil={calculateMinutesUntil(
                  tripPattern.legs[0].expectedStartTime
                )}
                calculateMinutesUntil={calculateMinutesUntil}
                configColor={configColor}
              />
            );
          })}
        </div>
    </div>
      
    </div>
  );
}

export default BusCards;
