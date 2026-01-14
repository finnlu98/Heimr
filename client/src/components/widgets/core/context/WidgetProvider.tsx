import CalenderProvider from "../../calender/context/CalenderContext";
import ElectricityProvider from "../../electricity/context/ElectricityContext";
import WeatherProvider from "../../weather/context/WeatherContext";

interface WidgetProvidersProps {
  children: React.ReactNode;
}

const WidgetProviders: React.FC<WidgetProvidersProps> = ({ children }) => {
  return (
    <ElectricityProvider>
      <CalenderProvider>
        <WeatherProvider>{children}</WeatherProvider>
      </CalenderProvider>
    </ElectricityProvider>
  );
};

export default WidgetProviders;
