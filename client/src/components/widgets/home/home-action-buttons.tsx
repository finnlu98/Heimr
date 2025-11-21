import HomeActionButton from "./home-action-button"
import { FaUnlock } from "react-icons/fa";
import { BsFillLightbulbOffFill } from "react-icons/bs";
import "./home-action-buttons.css"
import ImageCircle from "../../shared/imageCirlce/ImageCircle";


const HomeActionButtons: React.FC = () => {
    return (
        <div className="home-buttons-container">
            <div className="home-icon-container">
                <ImageCircle imgPath="./img/home/home-assistant.png" alt="home" />
            </div>
            <HomeActionButton Icon={BsFillLightbulbOffFill} event={"TurnOffHome"}/>
            <HomeActionButton Icon={FaUnlock} event={"TurnOffAutoLock"} />
        </div>
    )
}

export default HomeActionButtons