import Configuration from "../../../../../Configuration";
import BusCards from "./bus-cards";
import "./travel-card.css";
import { useDashboard } from "../../../../dashboard/dashboard-context";
import { WidgetEnum } from "../../../model/widget-type";
import { TravelCardConfig } from "../../TravelCardWidget";
import EditWidget from "../../../core/components/EditWidget";

const TravelCard: React.FC = () => {
  const { widgetConfigs } = useDashboard();
  const travelConfig = widgetConfigs[WidgetEnum.busCards] as TravelCardConfig;
  return (
    <div className="travel-container">
      <div className="widget-title">
        Public transport <img className="widget-title-icon" src="./img/bus-card/sign.png" alt="sign" />
      </div>
      {travelConfig ? (
        <div className="travel-rows">
          {travelConfig?.travelRoutes.map((busStop) => (
            <BusCards
              key={busStop.stopPlace}
              imgPath={busStop.imgIdentifier}
              startPlace={busStop.startPlace}
              stopPlace={busStop.stopPlace}
              configCard={busStop.configCard}
              configColor={busStop.configColor}
            />
          ))}
        </div>
      ) : (
        <EditWidget widgetKey={WidgetEnum.busCards} />
      )}
    </div>
  );
};

export default TravelCard;
