import moment, { min } from "moment";
import BusCard from "./bus-card";
import React, { useState, useEffect } from "react";
import "./bus-cards.css";
import TravelResponse from "../../model/Deziarilize/TravelResponse";
import { Mode } from "../../model/data/Mode";


interface BusCardsProps {
  title: string,
  travelData: TravelResponse,
  configCard: {
    numRows: number,
    minFilter: number
  },
  configColors: {
    general: number
    green: number
    yellow: number
  }
  fetchData: () => Promise<TravelResponse>
}

const BusCards: React.FC<BusCardsProps> = ({ title, travelData, configCard, configColors, fetchData }) => {
  
  const { numRows, minFilter } = configCard;
  
  const [tripPatterns, settripPatterns] = useState<TravelResponse>();

  useEffect(() => {settripPatterns(filterBusRides(travelData))}, [])

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
      const updatedTravelData = await fetchData();
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
                configColors={configColors}
              />
            );
          })}
        </div>
    </div>
      
    </div>
  );
}

export default BusCards;
