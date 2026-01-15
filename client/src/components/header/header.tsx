import React, { useState, useEffect } from "react";
import "./header.css";
import moment from "moment";
import { useAuth } from "../../context/AuthContext";
import ImageCircle from "../shared/imageCirlce/ImageCircle";

const Header: React.FC = () => {
  const [minutes, setMinutes] = useState(moment().format("HH:mm:ss"));
  const { home } = useAuth();
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setMinutes(moment().format("HH:mm:ss"));
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);
  return (
    <div
      className="header-container"
      style={{ backgroundImage: `url(${home?.bannerUrl || "./img/header/oslogate.jpg"})` }}
    >
      <div className="header-content-container">
        <div className="header-row">
          <h1 className="header-row-item left">
            <strong>{home?.name ? home.name : "Heimr"}</strong>
          </h1>
          <div className="header-row-item right">
            <h1>{minutes}</h1>
          </div>
        </div>
        <div className="header-row">
          <div className="header-row-item avatars">
            {home &&
              home?.users?.map((user, index) => (
                <div key={index} className="header-avatar">
                  {user?.avatarUrl ? (
                    <ImageCircle imgPath={user?.avatarUrl || ""} />
                  ) : (
                    <ImageCircle text={user?.email?.[0].toLocaleUpperCase() || ""} />
                  )}
                </div>
              ))}
          </div>
          <div className="header-row-item right stock-container">{/* <Stocks /> */}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
