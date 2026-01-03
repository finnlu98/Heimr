import React from "react";
import { useAuth } from "../../context/AuthContext";

interface HomeProfileProps {
  editMode: boolean;
}

const HomeProfile: React.FC<HomeProfileProps> = ({ editMode }) => {
  const { home } = useAuth();

  return (
    <div className="h-column">
      <div className="h-row">
        <p>🏷️</p>
        <input type="text" placeholder="Home Name" value={home?.name || ""} readOnly={!editMode} />
      </div>
      <div className="h-row">
        <p>📍</p>
        <input
          type="text"
          placeholder="Latitude"
          value={home?.location ? `${home.location.lat}` : ""}
          readOnly={!editMode}
        />
        <input
          type="text"
          placeholder="Longitude"
          value={home?.location ? `${home.location.lon}` : ""}
          readOnly={!editMode}
        />
      </div>
      <div className="h-row">
        <p>🖼️</p>
        <input type="file" accept="image/*" disabled={!editMode} />
      </div>
      <div className="h-row">
        <p>👥</p>
        <div className="h-column">
          {home?.users ? (
            home.users.map((user, index) => <div key={index}>{user.email}</div>)
          ) : (
            <div>You should add users to this home </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeProfile;
