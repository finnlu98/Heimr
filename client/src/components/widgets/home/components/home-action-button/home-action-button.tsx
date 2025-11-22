import HomePostMan from "../../api/home-postman";
import "./home-action-button.css"
import React from "react";
import PopupButton from "../../../../shared/popup/Popup";
import { useEffect } from "react";

interface HomeActionButtonProps  {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  event: string
  callOnClick: boolean
  body?: object
};

const HomeActionButton: React.FC<HomeActionButtonProps> = ({Icon, event, callOnClick, body}) => {
    
    

    const callPostman = async () => {
        if(callOnClick)
            await HomePostMan(event);
    }
    
    return (
        <div className="home-button" onClick={async () => await callPostman()}>
            <Icon className="home-button-icon"/>
        </div>
    )
}

export default HomeActionButton