import { useDashboard } from "../dashboard-context";

const DefaultDashboardActions: React.FC = () => {
  const { editMode, toggleEditMode } = useDashboard();
  return (
    <>
      {!editMode && (
        <div className="h-column widget-container gap-medium">
          <div className="h-column center">
            <p>Welcome! 👋</p>
            <p>Start building your dashboard 🏠</p>
          </div>
          <button onClick={toggleEditMode}>Edit Dashboard</button>
        </div>
      )}
    </>
  );
};
export default DefaultDashboardActions;
