import { IoAddCircleOutline } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";
import UserProfile from "./UserProfile";
import PopupButton from "../shared/popup/Popup";

interface HomeUsersProps {
  editMode: boolean;
}

const HomeUsers: React.FC<HomeUsersProps> = ({ editMode }) => {
  const { home } = useAuth();
  return (
    <>
      <div className="h-column">
        <label className="section-label">👥 Household</label>
        {home?.users ? (
          home.users.map((user, index) => (
            <UserProfile key={index} user={user} editMode={false} onSave={async () => {}} />
          ))
        ) : (
          <div>You should add users to this home </div>
        )}
        {editMode && (
          <div className="h-row center">
            <PopupButton closePopupSeconds={10}>
              <button className="center" disabled={!editMode}>
                Add Member <IoAddCircleOutline />
              </button>
              <div className="h-row">
                <input type="text" placeholder="Enter email to invite" className="popup-input" />
                <button className="popup-button">Send Invite</button>
              </div>
            </PopupButton>
          </div>
        )}
      </div>
    </>
  );
};
export default HomeUsers;
