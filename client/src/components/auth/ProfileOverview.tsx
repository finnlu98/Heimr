import { useRef, useState } from "react";
import "./ProfileOverview.css";
import { IoMdSend } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";
import { CiEdit } from "react-icons/ci";
import HomeProfile from "./HomeProfile";
import UserProfile from "./UserProfile";
import Login from "./Login";
import Tab from "../shared/tab/Tab";
import HomeUsers from "./HomeUsers";

const ProfileOverview: React.FC = () => {
  const [email, setEmail] = useState("");
  const { user, login, logout } = useAuth();

  const [editMode, setEditMode] = useState(false);

  const userProfileSaveRef = useRef<(() => Promise<void>) | null>(null);
  const homeProfileSaveRef = useRef<(() => Promise<void>) | null>(null);

  function handleSubmit() {
    if (email === "") return;
    login(email);
  }

  async function saveAllProfiles() {
    try {
      if (userProfileSaveRef.current) {
        await userProfileSaveRef.current();
      }
      if (homeProfileSaveRef.current) {
        await homeProfileSaveRef.current();
      }
      setEditMode(false);
    } catch (error) {
      console.error("Failed to save profiles", error);
    }
  }

  function cancelEdit() {
    setEditMode(false);
  }

  return (
    <>
      <div className="login-container h-column">
        {!user ? (
          <Login email={email} setEmail={setEmail} handleSubmit={handleSubmit} />
        ) : (
          <div className="h-column gap-large">
            <div>
              <p>Hi there! 👋</p>
              <p>
                You are logged in with <strong>{user.email}</strong>
              </p>
            </div>
            <div className="h-row profile-overview">
              <div className="h-column gap-large">
                <UserProfile
                  user={user}
                  editMode={editMode}
                  onSave={(saveFn) => (userProfileSaveRef.current = saveFn)}
                  showHeader={true}
                />
                <HomeUsers editMode={editMode} />
              </div>
              <HomeProfile editMode={editMode} onSave={(saveFn) => (homeProfileSaveRef.current = saveFn)} />
            </div>
          </div>
        )}
      </div>
      {user && (
        <div className="h-row action-buttons">
          {editMode ? (
            <>
              <button onClick={saveAllProfiles}>
                Save <IoMdSend />
              </button>
              <button onClick={cancelEdit}>Cancel</button>
            </>
          ) : (
            <button onClick={() => setEditMode(true)}>
              Edit <CiEdit />
            </button>
          )}
          <button onClick={() => logout()}>Sign out</button>
        </div>
      )}
    </>
  );
};
export default ProfileOverview;
