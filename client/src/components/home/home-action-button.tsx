
import { HomePostMan } from "../../api/home-fetcher";
import "./home-action-button.css"
import React from "react";

interface HomeActionButtonProps  {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  event: string
};

const HomeActionButton: React.FC<HomeActionButtonProps> = ({Icon, event}) => {
    
    async function RunActionButton(event: string) {
        await HomePostMan(event);
    }
    
    return (
        <div className="circle home-button">
            <Icon fill="#f3a71aff" onClick={() => HomePostMan(event)}/>
        </div>
    )
}

export default HomeActionButton