import { useDashboard } from "../../../context/dashboard-context";
import { Grid } from "./grid";
import "./grid-container.css";

interface GridContainerProps {
  zoom: number;
}

const GridContainer: React.FC<GridContainerProps> = ({ zoom }) => {
  const { dashboardSize } = useDashboard();

  return (
    <div
      className="grid-container"
      style={{
        width: `${dashboardSize.width}px`,
        height: `${dashboardSize.height}px`,
        transform: `scale(${zoom})`,
        transformOrigin: "top center",
      }}
    >
      <Grid />
    </div>
  );
};

export default GridContainer;
