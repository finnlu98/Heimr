import { ConfigColor } from "./ConfigColor"
import Configuration from "../../Configuration"
import BusCards from "./bus-cards"
import "./travel-card.css"
import { IoBus } from "react-icons/io5";


const TravelCard: React.FC = () => {
    return (
    <div className="travel-container">
        <div className="travel-container-header">Public transport <img src="./img/bus-card/sign.png"/></div>
        <div className="travel-rows">
            {Configuration.getBusStopConfigs().map((busStop) => (
                    <BusCards
                      key={busStop.title}
                      title={busStop.title}
                      imgPath={busStop.imgPath}
                      startPlace={busStop.startPlace}
                      stopPlace={busStop.stopPlace}
                      configCard={busStop.configCard}
                      configColor={busStop.configColor}
                    />
                  ))}
        </div>
    </div>)
}

export default TravelCard;