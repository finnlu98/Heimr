import { useState } from "react";
import "./App.css";
import "./styles/global.css";
import "./styles/colors.css";
import "./styles/widgets.css";
import "./styles/animation.css";
import "leaflet/dist/leaflet.css";
import { Grid } from "./components/dashboard/grid/grid";
import EditModeToggleButton from "./components/dashboard/editMode/edit-mode-button";
import Sidebar from "./components/dashboard/sidebar/sidebar";
import DashboardProvider from "./components/dashboard/dashboard-context";
import AuthProvider from "./context/AuthContext";
import apiClient from "./api/ApiClient";
import WidgetProviders from "./components/widgets/core/context/WidgetProvider";
import externalApiClient from "./api/ExternalApiClient";
import { ScreenSizeSelector } from "./components/dashboard/screenSizeSelector/screen-size-selector";
import ZoomControl from "./components/dashboard/zoomControl/zoom-control";
import ErrorBoundary from "./components/error/error-boundary";
import { ApiBridge } from "./feedback/loading/components/ApiBridge";
import FeedBackProvider from "./feedback/FeedProvider";

function App() {
  const [screenSize, setScreenSize] = useState<{ width: number; height: number }>({ width: 800, height: 1064 });
  const [zoom, setZoom] = useState(1);

  return (
    <ErrorBoundary>
      <FeedBackProvider>
        <ApiBridge apiClient={apiClient} />
        <ApiBridge apiClient={externalApiClient} />
        <AuthProvider>
          <DashboardProvider>
            <WidgetProviders>
              <ScreenSizeSelector currentSize={screenSize} onSizeChange={setScreenSize} />
              <ZoomControl zoom={zoom} onZoomChange={setZoom} screenSize={screenSize} />
              <div className="app">
                <div>
                  <Sidebar />
                </div>
                <div
                  className="grid-container"
                  style={{
                    width: `${screenSize.width}px`,
                    height: `${screenSize.height}px`,
                    transform: `scale(${zoom})`,
                    transformOrigin: "top center",
                  }}
                >
                  <Grid />
                </div>
                <EditModeToggleButton />
              </div>
            </WidgetProviders>
          </DashboardProvider>
        </AuthProvider>
      </FeedBackProvider>
    </ErrorBoundary>
  );
}

export default App;
