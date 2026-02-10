import { useAuth } from "../../../context/AuthContext";
import { useDashboard } from "../../../context/dashboard-context";
import { EditingKey } from "../model/EditMode";

const DefaultDashboardActions: React.FC = () => {
  const { user } = useAuth();
  const { toggleEditMode, setEditingKey } = useDashboard();
  return (
    <>
      <div className="h-column widget-container gap-medium">
        <div className="h-column center">
          <p>Welcome! 👋</p>
          <p>Start building your dashboard 🏠</p>
        </div>
        {!user && <button onClick={() => setEditingKey(EditingKey.profile)}>Log in</button>}
        <button onClick={() => toggleEditMode()}>Edit Dashboard</button>
        <button onClick={() => setEditingKey(EditingKey.layoutTemplate)}>Apply Template</button>
      </div>
    </>
  );
};
export default DefaultDashboardActions;
