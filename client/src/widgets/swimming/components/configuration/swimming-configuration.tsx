import AdressSearch from "../../../../core/shared/adressSearch/AdressSearch";
import { Address } from "../../../../model/Adress";
import { SwimmingConfig } from "../../swimming-widget";

interface SwimmingConfigurationProps {
  setConfig: (config: SwimmingConfig) => void;
}

const SwimmingConfiguration: React.FC<SwimmingConfigurationProps> = ({ setConfig }) => {
  function handleAddressSelect(address: Address) {
    setConfig({ searchLocation: address });
  }

  return (
    <div className="h-column">
      <label htmlFor="lon">Your location:</label>
      <div className="h-row">
        <AdressSearch onAddressSelect={handleAddressSelect} />
      </div>
    </div>
  );
};

export default SwimmingConfiguration;
