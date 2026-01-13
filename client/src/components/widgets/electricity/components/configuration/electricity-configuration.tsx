import { useState } from "react";
import LoadingButton from "../../../../../feedback/components/Loading/LoadingButton";
import { useElectricityConsumption } from "../../context/ElectricityContext";
import { IoMdSend } from "react-icons/io";

const ElectricityConfiguration: React.FC = () => {
  const [elviaKey, setElviaKey] = useState<string>("");
  const { postElviaKey, hasElviaKey } = useElectricityConsumption();
  const [postNewKey, setPostNewKey] = useState(false);

  const registerKey = async () => {
    await postElviaKey(elviaKey);
    setPostNewKey(false);
  };

  return (
    <div className="h-column">
      <label htmlFor="electricityKey">Elvia API Key:</label>
      <div className="h-row">
        {hasElviaKey && !postNewKey ? (
          <div className="h-column gap-tiny">
            <p>Key is active ✅</p>
            <button className="button-text-only font-small" onClick={() => setPostNewKey(true)}>
              (Register new key)
            </button>
          </div>
        ) : (
          <>
            <input type="text" value={elviaKey} onChange={(e) => setElviaKey(e.target.value)} />
            <LoadingButton onClick={registerKey} loadingKey="post-elvia-key">
              <IoMdSend />
            </LoadingButton>
          </>
        )}
      </div>
    </div>
  );
};

export default ElectricityConfiguration;
