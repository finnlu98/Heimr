import { useEffect } from "react";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header/header";


import "./App.css";
import "./styles/global.css"
import "./styles/colors.css"
import "./styles/widgets.css"
import 'leaflet/dist/leaflet.css';
import { Grid } from "./components/grid/grid";
import EditModeToggleButton from "./components/shared/editMode/edit-mode-button";
import Sidebar from "./components/sidebar/sidebar";
import DashboardProvider from "./components/dashboard/dashboard-context";


function App() {
  const reloadHour = 5;
  const reloadMinute = 30;

  useEffect(() => {
    const shouldReload = () => {
      const now = moment();
      return (
        now.hour() === reloadHour &&
        now.minute() === reloadMinute &&
        now.second() === 0
      );
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
    <DashboardProvider>
      <div className="app">
        <div>
          <Sidebar />
        </div>
        <div className="container mt-2 mb-2">
            <div className="col-12 mt-2">
              <Header />
            </div>
          <div className="grid-container">
              <Grid /> 
          </div>
        </div>
        <EditModeToggleButton />
      </div>
    </DashboardProvider>
    
  );
}

export default App;
