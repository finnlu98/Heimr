import { Modal } from "../../shared/modal/modal";

interface LoadServerConfigProps {
  isOpen?: boolean;
  onConfirm?: () => void;
  onClose: () => void;
}

const LoadServerConfig: React.FC<LoadServerConfigProps> = ({ isOpen = false, onClose, onConfirm }) => {
  function handleConfirm() {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  }

  return (
    <Modal open={isOpen} onClose={onClose} size="small">
      <div className="h-column gap-large">
        <h4>Load Saved Configuration?</h4>
        <p>You have saved configuration for widget layout and options stored on your profile. Do you want to use it?</p>
        <div className="h-row">
          <button onClick={handleConfirm}>Load Saved Layout</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default LoadServerConfig;
