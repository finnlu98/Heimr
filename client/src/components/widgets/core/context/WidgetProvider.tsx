import ElectricityProvider from "../../electricity/context/ElectricityContext";

interface WidgetProvidersProps {
  children: React.ReactNode;
}

const WidgetProviders: React.FC<WidgetProvidersProps> = ({ children }) => {
  return <ElectricityProvider>{children}</ElectricityProvider>;
};

export default WidgetProviders;
