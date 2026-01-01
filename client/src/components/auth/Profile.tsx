import { useState } from "react";
import "./Profile.css";
import { Modal } from "../shared/modal/modal";
import Login from "./Login";
import { useAuth } from "../../context/AuthContext";

const Profile: React.FC = () => {
  const [editProfile, setEditProfile] = useState(false);
  const { user } = useAuth();

  return (
    <div>
      <div
        className="profile-container circle medium"
        onClick={() => setEditProfile(true)}
      >
        <div>
          <strong>{user ? user.charAt(0).toUpperCase() : "?"}</strong>
        </div>
      </div>
      {editProfile && (
        <Modal
          open={editProfile}
          onClose={() => setEditProfile(false)}
          title="Profile settings"
        >
          <Login />
        </Modal>
      )}
    </div>
  );
};

export default Profile;
