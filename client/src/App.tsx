import "./App.css";
import "./styles/global.css";
import "./styles/colors.css";
import "./styles/widgets.css";
import "./styles/animation.css";
import "leaflet/dist/leaflet.css";
import AuthProvider from "./context/AuthContext";
import apiClient from "./api/ApiClient";
import externalApiClient from "./api/ExternalApiClient";
import ErrorBoundary from "./feedback/error/error-boundary";
import { ApiBridge } from "./feedback/loading/components/ApiBridge";
import FeedBackProvider from "./feedback/FeedProvider";
import DashboardContainer from "./core/dashboard/dashboard-container";

function App() {
  return (
    <ErrorBoundary>
      <FeedBackProvider>
        <ApiBridge apiClient={apiClient} />
        <ApiBridge apiClient={externalApiClient} />
        <AuthProvider>
          <div className="app">
            <DashboardContainer />
          </div>
        </AuthProvider>
      </FeedBackProvider>
    </ErrorBoundary>
  );
}

export default App;
