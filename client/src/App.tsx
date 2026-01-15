import { useEffect } from "react";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header/header";

import "./App.css";
import "./styles/global.css";
import "./styles/colors.css";
import "./styles/widgets.css";
import "leaflet/dist/leaflet.css";
import { Grid } from "./components/dashboard/grid/grid";
import EditModeToggleButton from "./components/dashboard/editMode/edit-mode-button";
import Sidebar from "./components/dashboard/sidebar/sidebar";
import DashboardProvider from "./components/dashboard/dashboard-context";
import AuthProvider, { useAuth } from "./context/AuthContext";
import { LoadingProvider } from "./feedback/providers/LoadingProvider";
import { ApiBridge } from "./feedback/components/ApiBridge";
import apiClient from "./api/ApiClient";
import WidgetProviders from "./components/widgets/core/context/WidgetProvider";
import { useSearchParams } from "react-router-dom";

function App() {
  const reloadHour = 5;
  const reloadMinute = 30;

  useEffect(() => {
    const shouldReload = () => {
      const now = moment();
      return now.hour() === reloadHour && now.minute() === reloadMinute && now.second() === 0;
    };

    const reloadAtTargetHour = () => {
      if (shouldReload()) {
        window.location.reload();
      }
    };

    reloadAtTargetHour();

    const intervalId = setInterval(reloadAtTargetHour, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <LoadingProvider>
      <ApiBridge apiClient={apiClient} />
      <AuthProvider>
        <DashboardProvider>
          <WidgetProviders>
            <div className="app">
              <div>
                <Sidebar />
              </div>
              <div className="container">
                <Header />
                <div className="grid-container">
                  <Grid />
                </div>
                <EditModeToggleButton />
              </div>
            </div>
          </WidgetProviders>
        </DashboardProvider>
      </AuthProvider>
    </LoadingProvider>
  );
}

export default App;
