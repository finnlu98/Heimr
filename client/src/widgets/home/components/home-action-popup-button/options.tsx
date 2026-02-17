import "./options.css"
import React from "react";
import HomePostMan from "../../api/home-postman";

interface OptionsProps {
    event: string
    options: Record<string, string>;
}

const Options: React.FC<OptionsProps> = ({event, options}) => {

    function formatTime(option: string) {
        if(!option.includes(":"))
            return option;

        const [h, m] = option.split(":").map(Number);
        
        if (h === 0 && m > 0) return `${m} min`;
        if (m === 0) return `${h} h`;

        return `${h} h ${m} min`;
    }

    return (
        <div className="lock-opts" >
            {Object.values(options).map((o) => {
                return <div className="home-button" key={o} onClick={async () => HomePostMan(event, o)} >
                    <div className="lock-opt">{formatTime(o)}</div>
                </div>
            })}
        </div>
    )
}

export default Options