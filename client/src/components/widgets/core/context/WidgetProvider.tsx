import CalenderProvider from "../../calender/context/CalenderContext";
import ElectricityProvider from "../../electricity/context/ElectricityContext";

interface WidgetProvidersProps {
  children: React.ReactNode;
}

const WidgetProviders: React.FC<WidgetProvidersProps> = ({ children }) => {
  return (
    <ElectricityProvider>
      <CalenderProvider>{children}</CalenderProvider>
    </ElectricityProvider>
  );
};

export default WidgetProviders;
