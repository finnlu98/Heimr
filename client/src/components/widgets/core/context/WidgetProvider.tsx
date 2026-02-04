import CalenderProvider from "../../calender/context/CalenderContext";
import CityBikeProvider from "../../city-bike/context/CityBikeContext";
import ElectricityProvider from "../../electricity/context/ElectricityContext";
import WeatherProvider from "../../weather/context/WeatherContext";

interface WidgetProvidersProps {
  children: React.ReactNode;
}

const WidgetProviders: React.FC<WidgetProvidersProps> = ({ children }) => {
  return (
    <ElectricityProvider>
      <CalenderProvider>
        <WeatherProvider>
          <CityBikeProvider>{children}</CityBikeProvider>
        </WeatherProvider>
      </CalenderProvider>
    </ElectricityProvider>
  );
};

export default WidgetProviders;
