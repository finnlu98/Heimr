import CityBikeProvider from "../../city-bike/context/CityBikeContext";

interface WidgetProvidersProps {
  children: React.ReactNode;
}

const WidgetProviders: React.FC<WidgetProvidersProps> = ({ children }) => {
  return <CityBikeProvider>{children}</CityBikeProvider>;
};

export default WidgetProviders;
