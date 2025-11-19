import Configuration from "../../Configuration"
import BusCards from "./bus-cards"
import "./travel-card.css"

const TravelCard: React.FC = () => {
    return (
    <div className="travel-container">
        <div className="widget-title">Public transport <img className="widget-title-icon" src="./img/bus-card/sign.png" alt="sign"/></div>
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