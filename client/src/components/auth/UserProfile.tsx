import { User } from "../../model/User";
import ImageCircle from "../shared/imageCirlce/ImageCircle";
import UploadImageCircle from "../shared/imageCirlce/UploadImageCircle";

interface UserProfileProps {
  user: User;
  editMode: boolean;
  imgPath: string | undefined;
  name: string;
  setName: (name: string) => void;
  handleImageChange: (dataUrl: string | null, file: File | null) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, editMode, imgPath, name, setName, handleImageChange }) => {
  // Component code here
  return (
    <div className="h-column gap-large">
      <div className="h-column">
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
