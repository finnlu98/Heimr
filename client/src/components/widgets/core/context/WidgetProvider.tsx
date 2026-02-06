import CalenderProvider from "../../calender/context/CalenderContext";
import CityBikeProvider from "../../city-bike/context/CityBikeContext";
import ElectricityProvider from "../../electricity/context/ElectricityContext";

interface WidgetProvidersProps {
  children: React.ReactNode;
}

const WidgetProviders: React.FC<WidgetProvidersProps> = ({ children }) => {
  return (
    <ElectricityProvider>
      <CalenderProvider>
        <CityBikeProvider>{children}</CityBikeProvider>
      </CalenderProvider>
    </ElectricityProvider>
  );
};

export default WidgetProviders;
