import { useEffect, useState } from "react";
import { User } from "../../model/User";
import ImageCircle from "../shared/imageCirlce/ImageCircle";
import UploadImageCircle from "../shared/imageCirlce/UploadImageCircle";
import { useAuth } from "../../context/AuthContext";

interface UserProfileProps {
  user: User;
  editMode: boolean;
  onSave: (saveFn: () => Promise<void>) => void;
  showHeader?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, editMode, onSave, showHeader }) => {
  const { updatePersonalia } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [imgPath, setImgPath] = useState<string | undefined>(user?.avatarUrl || undefined);
  const [file, setFile] = useState<File | null>(null);

  function handleImageChange(dataUrl: string | null, file: File | null) {
    if (!dataUrl) return;
    setImgPath(dataUrl);
    setFile(file);
  }

  useEffect(() => {
    const saveProfile = async () => {
      if (!user) return;
      if (name === "" && file === null) return;

      await updatePersonalia({ name }, file);
    };

    onSave(saveProfile);
  }, [name, file, user, updatePersonalia, onSave]);

  useEffect(() => {
    if (!editMode) {
      setName(user?.name || "");
      setImgPath(user?.avatarUrl || undefined);
      setFile(null);
    }
  }, [editMode, user]);

  return (
    <div className="h-column gap-large">
      <div className="h-column">
        {showHeader && <label className="section-label">👤 Me</label>}
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
  );
};
export default UserProfile;
