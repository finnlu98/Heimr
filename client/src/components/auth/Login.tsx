import { useState } from "react";
import "./Login.css";
import { IoMdSend } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";
import UploadImageCircle from "../shared/imageCirlce/UploadImageCircle";
import { CiEdit } from "react-icons/ci";
import ImageCircle from "../shared/imageCirlce/ImageCircle";

const Login: React.FC = () => {
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
          <div>
            <p>Enter your email to login 🚀</p>
            <div className="h-row">
              <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button className="btn-primary" onClick={handleSubmit}>
                <IoMdSend />
              </button>
            </div>
          </div>
        ) : (
          <div className="h-column gap-large">
            <div>
              <p>Hi there! 👋</p>
              <p>
                You are logged in with <strong>{user.email}</strong>
              </p>
            </div>
            <div className="h-column">
              <h5>Personalia</h5>
              <div className="h-row gap-large">
                {user && !imgPath && !editMode ? (
                  <ImageCircle text={user.email.charAt(0).toUpperCase()} />
                ) : (
                  <UploadImageCircle onImageChange={handleImageChange} imgPath={imgPath} disabled={!editMode} />
                )}
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!editMode}
                />
              </div>
            </div>
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
export default Login;
