import React, { useState, useEffect } from "react";
import "./header.css";
import moment from "moment";
import HomeAvatar from "../home-avatar/home-avatar";

const Header : React.FC = () => {
  const [minutes, setMinutes] = useState(moment().format("HH:mm:ss"));
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setMinutes(moment().format("HH:mm:ss"));
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  return (
    <div className="header-container">
          <div className="header-content-container" >
              <div className="header-texts">
                <h1 className="header-text left"><strong>Stensberggata 21</strong></h1>
                <h1 className="header-text right">{minutes}</h1>
              </div>
            
              <div className="avatars">
                  <div className="header-avatar"> <HomeAvatar name="finn_griggs" /></div>
                  <div className="header-avatar"><HomeAvatar name="pernille" /></div>
                  <div className="header-avatar"><HomeAvatar name="line" /></div>
              </div>
            
              
          </div>
          
    </div>
  );
}

export default Header;
