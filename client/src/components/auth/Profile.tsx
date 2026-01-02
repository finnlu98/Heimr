import { useState } from "react";
import "./Profile.css";
import { Modal } from "../shared/modal/modal";
import Login from "./Login";
import { useAuth } from "../../context/AuthContext";
import ImageCircle from "../shared/imageCirlce/ImageCircle";

const Profile: React.FC = () => {
  const [editProfile, setEditProfile] = useState(false);
  const { user } = useAuth();

  return (
    <div>
      <div className="profile-container" onClick={() => setEditProfile(true)}>
        <ImageCircle imgPath={user?.avatarUrl} text={user ? user.email.charAt(0).toUpperCase() : "?"} />
      </div>
      {editProfile && (
        <Modal open={editProfile} onClose={() => setEditProfile(false)} title="Profile settings">
          <Login />
        </Modal>
      )}
    </div>
  );
};

export default Profile;
