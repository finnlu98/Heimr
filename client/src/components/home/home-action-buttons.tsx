import HomeActionButton from "./home-action-button"
import { FaUnlock } from "react-icons/fa";
import { BsFillLightbulbOffFill } from "react-icons/bs";
import "./home-action-buttons.css"
import { FaBuildingCircleArrowRight } from "react-icons/fa6";


const HomeActionButtons: React.FC = () => {
    return (
        <div className="home-buttons-container">
            <div className="home-icon-container">
                <div className="circle home-icon"><img className="avatar-img" src="./img/home/home-assistant.png" alt="" /></div>
            </div> 
            <HomeActionButton Icon={BsFillLightbulbOffFill} event={"TurnOffHome"}/>
            <HomeActionButton Icon={FaUnlock} event={"TurnOffAutoLock"} />
            {/* <HomeActionButton Icon={FaBuildingCircleArrowRight} /> */}
        </div>
    )
}

export default HomeActionButtons