import React, { useState, useEffect } from "react";
import "./header.css";
import moment from "moment";
import HomeAvatar from "../standalone/home-avatar/home-avatar";
// import Stocks from "../widgets/stocks/components/card/stocks";

const Header: React.FC = () => {
  const [minutes, setMinutes] = useState(moment().format("HH:mm:ss"));
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setMinutes(moment().format("HH:mm:ss"));
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  return (
    <div className="header-container">
      <div className="header-content-container">
        <div className="header-row">
          <h1 className="header-row-item left">
            <strong>Stensberggata 21</strong>
          </h1>
          <div className="header-row-item right">
            <h1>{minutes}</h1>
          </div>
        </div>
        <div className="header-row">
          <div className="header-row-item avatars">
            <div className="header-avatar">
              {" "}
              <HomeAvatar name="finn_griggs" />
            </div>
            <div className="header-avatar">
              <HomeAvatar name="pernille" />
            </div>
            <div className="header-avatar">
              <HomeAvatar name="line" />
            </div>
          </div>
          <div className="header-row-item right stock-container">
            {/* <Stocks /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
