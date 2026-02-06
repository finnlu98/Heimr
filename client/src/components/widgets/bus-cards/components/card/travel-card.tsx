import BusCards from "./bus-cards";
import "./travel-card.css";
import LoadingHelperWidget from "../../../core/components/LoadingHelperWidget";
import { WidgetEnum } from "../../../core/model/widget-type";
import { BusData } from "../../model/BusData";
import { useDashboard } from "../../../../dashboard/dashboard-context";
import { TravelCardConfig } from "../../TravelCardWidget";
import { TripIdentifier } from "../../model/enum/TripIdentifier";

interface TravelCardProps {
  data?: BusData[] | undefined;
}

const TravelCard: React.FC<TravelCardProps> = ({ data }) => {
  const { widgetConfigs } = useDashboard();
  const config = widgetConfigs[WidgetEnum.busCards] as TravelCardConfig;
  return (
    <LoadingHelperWidget
      widgetKey={WidgetEnum.busCards}
      loadingKeys={["fetch-bus-card"]}
      showConfig={() => !data || data.length === 0}
    >
      <div className="travel-container">
        <div className="widget-title">
          Public transport <img className="widget-title-icon" src="./img/bus-card/sign.png" alt="sign" />
        </div>
        <div className="travel-rows">
          {data?.map((busData) => (
            <BusCards
              key={busData.travelRoute.stopPlace.properties.id}
              tripIdentifier={config?.tripIdentifier ?? TripIdentifier.title}
              travelRoute={busData.travelRoute}
              tripPatterns={busData.travelResponse.data.trip.tripPatterns}
            />
          ))}
        </div>
      </div>
    </LoadingHelperWidget>
  );
};

export default TravelCard;
