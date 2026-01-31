import moment from "moment";
import BusCard from "./bus-card";
import React, { useState, useEffect, useRef } from "react";
import "./bus-cards.css";
import { TripPatterns } from "../../model/TravelResponse";
import { Mode } from "../../model/enum/Mode";
import { ConfigColor } from "./ConfigColor";
import FetchBustimes from "../../api/bus-time-fetcher";
import { v4 as uuidv4 } from "uuid";
import ImageCircle from "../../../../shared/imageCirlce/ImageCircle";
import { TravelStop } from "../../model/StopSearchResponse";
import { TripIdentifier } from "../../model/enum/TripIdentifier";

interface BusCardsProps {
  tripIdentifier?: TripIdentifier;
  imgPath?: string;
  tripTitle?: string;
  startPlace: TravelStop;
  stopPlace: TravelStop;
  configCard: {
    numRows: number;
    minFilter: number;
  };
  configColor: ConfigColor;
}

const BusCards: React.FC<BusCardsProps> = ({
  tripIdentifier,
  imgPath,
  tripTitle,
  startPlace,
  stopPlace,
  configCard,
  configColor,
}) => {
  const { numRows, minFilter } = configCard;
  const [tripPatterns, settripPatterns] = useState<TripPatterns[]>();
  const idRef = useRef(uuidv4());

  useEffect(() => {
    const fetchAndFilter = async () => {
      var busTimes = await FetchBustimes(idRef.current, startPlace.properties.id, stopPlace.properties.id);
      settripPatterns(filterBusRides(busTimes.data.trip.tripPatterns));
    };
    fetchAndFilter();
  }, []);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      var filteredBusTimes = filterBusRides(tripPatterns);
      if (filteredBusTimes.length !== 0) settripPatterns(filteredBusTimes);
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  useEffect(() => {
    const updateInterval = setInterval(
      () => {
        updateTravelData();
      },
      7 * 60 * 1000,
    );

    return () => clearInterval(updateInterval);
  }, []);

  async function updateTravelData() {
    try {
      const updatedTravelData = await FetchBustimes(idRef.current, startPlace.properties.id, stopPlace.properties.id);
      settripPatterns(filterBusRides(updatedTravelData.data.trip.tripPatterns));
    } catch (error) {
      console.error("Can't update data:", error);
    }
  }

  function filterBusRides(tripPatterns: TripPatterns[] | undefined): TripPatterns[] {
    if (tripPatterns === undefined || !tripPatterns) return [];

    return tripPatterns
      .map((tripPattern) => ({
        ...tripPattern,
        legs: tripPattern.legs.filter(
          (leg) =>
            Object.values(Mode).includes(leg.mode.toUpperCase() as Mode) &&
            calculateMinutesUntil(leg.expectedStartTime) >= minFilter,
        ),
      }))
      .filter((tripPattern) => tripPattern.legs.length === 1);
  }

  function calculateMinutesUntil(startTime: string) {
    const now = moment().utc();
    const tripStartTime = moment(startTime).utc();
    const diffInMinutes = tripStartTime.diff(now, "minutes");
    return diffInMinutes;
  }

  return (
    <div className="h-column">
      {tripIdentifier === TripIdentifier.title && (
        <div className="trip-identifier">
          <p>{tripTitle} </p>
        </div>
      )}
      <div className="bus-cards">
        {tripIdentifier === TripIdentifier.img && <ImageCircle imgPath={imgPath} alt="Bus stop arrival" />}

        {tripPatterns &&
          tripPatterns.slice(0, numRows).map((tripPattern) => {
            return (
              <BusCard
                key={tripPattern.legs[0].expectedStartTime}
                name={tripPattern.legs[0].line.name.split(" ")[0]}
                publicCode={tripPattern.legs[0].line.publicCode}
                startTime={tripPattern.legs[0].expectedStartTime}
                minutesUntil={calculateMinutesUntil(tripPattern.legs[0].expectedStartTime)}
                calculateMinutesUntil={calculateMinutesUntil}
                configColor={configColor}
              />
            );
          })}
      </div>
    </div>
  );
};

export default BusCards;
