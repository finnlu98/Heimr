import { useState } from "react";
import "./ProfileOverview.css";
import { IoMdSend } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";
import { CiEdit } from "react-icons/ci";
import HomeProfile from "./HomeProfile";
import UserProfile from "./UserProfile";
import Login from "./Login";
import Tab from "../shared/tab/Tab";

const ProfileOverview: React.FC = () => {
  const [email, setEmail] = useState("");
  const { user, login, logout, updatePersonalia } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [imgPath, setImgPath] = useState<string | undefined>(user?.avatarUrl || undefined);
  const [file, setFile] = useState<File | null>(null);
  const [editMode, setEditMode] = useState(false);

  function handleSubmit() {
    if (email === "") return;
    login(email);
  }

  function handleImageChange(dataUrl: string | null, file: File | null) {
    if (!dataUrl) return;
    setImgPath(dataUrl);
    setFile(file);
  }

  function saveProfile() {
    if (!user && name === "" && file === null) return;
    updatePersonalia({ name }, file);
    setEditMode(false);
  }

  function cancelEdit() {
    setName(user?.name || "");
    setImgPath(user?.avatarUrl || undefined);
    setFile(null);
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
            <Tab
              tabs={[
                {
                  label: "Personalia",
                  content: (
                    <UserProfile
                      user={user}
                      editMode={editMode}
                      imgPath={imgPath}
                      name={name}
                      setName={setName}
                      handleImageChange={handleImageChange}
                    />
                  ),
                },
                {
                  label: "Home",
                  content: <HomeProfile editMode={editMode} />,
                },
              ]}
            />
          </div>
        )}
      </div>
      {user && (
        <div className="h-row action-buttons">
          {editMode ? (
            <>
              <button onClick={saveProfile}>
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
