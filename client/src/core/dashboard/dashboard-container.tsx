import { useState } from "react";
import DashboardProvider from "../../context/dashboard-context";
import EditModeToggleButton from "./editMode/edit-mode-button";
import GridContainer from "./grid/grid-container";
import { ScreenSizeSelector } from "./screenSizeSelector/screen-size-selector";
import Sidebar from "./sidebar/sidebar";
import ZoomControl from "./zoomControl/zoom-control";

const DashboardContainer: React.FC = () => {
  const [zoom, setZoom] = useState(1);

  return (
    <DashboardProvider>
      <ScreenSizeSelector />
      <ZoomControl zoom={zoom} onZoomChange={setZoom} />
      <div>
        <Sidebar />
      </div>
      <GridContainer zoom={zoom} />
      <EditModeToggleButton />
    </DashboardProvider>
  );
};

export default DashboardContainer;
