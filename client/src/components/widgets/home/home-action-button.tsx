import HomePostMan from "./api/home-postman";
import "./home-action-button.css"
import React from "react";

interface HomeActionButtonProps  {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  event: string
};

const HomeActionButton: React.FC<HomeActionButtonProps> = ({Icon, event}) => {

    return (
        <div className="home-button" onClick={async () => await HomePostMan(event)}>
            <Icon fill="#f3a71aff"/>
        </div>
    )
}

export default HomeActionButton