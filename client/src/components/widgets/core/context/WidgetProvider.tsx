import CityBikeProvider from "../../city-bike/context/CityBikeContext";
import ElectricityProvider from "../../electricity/context/ElectricityContext";

interface WidgetProvidersProps {
  children: React.ReactNode;
}

const WidgetProviders: React.FC<WidgetProvidersProps> = ({ children }) => {
  return (
    <ElectricityProvider>
      <CityBikeProvider>{children}</CityBikeProvider>
    </ElectricityProvider>
  );
};

export default WidgetProviders;
