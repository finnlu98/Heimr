import moment from "moment";
import BusCard from "./bus-card";
import React, { useState, useEffect } from "react";
import "./bus-cards.css";
import { TripPatterns } from "../../model/Deziarilize/TravelResponse";
import { Mode } from "../../model/data/Enum/Mode";
import { ConfigColor } from "./ConfigColor";
import FetchBustimes from "../../api/bus-time-fetcher";

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
  
  const [tripPatterns, settripPatterns] = useState<TripPatterns[]>();
 
  useEffect(() => {
    const fetchAndFilter = async () => {
    var busTimes = await FetchBustimes(startPlace, stopPlace)
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
  });

  useEffect(() => {
    const updateInterval = setInterval(() => {
      updateTravelData();
    }, 7 * 60 * 1000);

    return () => clearInterval(updateInterval);
  }, []);


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

  
  async function updateTravelData() {
    try {
      const updatedTravelData = await FetchBustimes(startPlace, stopPlace);
      settripPatterns(filterBusRides(updatedTravelData.data.trip.tripPatterns));
    } catch (error) {
      console.error("Can't update data:", error);
    }
  }

  return (
    <div>
      <div className="busstider-header mb-2">
          <h5>{title}</h5>
        </div>
        <div>
          {tripPatterns && tripPatterns.slice(0, numRows).map((tripPattern) => {
            return (
              <BusCard
                key={tripPattern.legs[0].expectedStartTime}
                name={tripPattern.legs[0].line.name.split(" ")[0]}
                publicCode={tripPattern.legs[0].line.publicCode}
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
    </div>
  );
}

export default BusCards;
