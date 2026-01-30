import React, { useEffect, useState } from "react";
import "./screen-size-selector.css";
import { useDashboard } from "../dashboard-context";

interface ScreenSize {
  width: number;
  height: number;
}

interface ScreenSizeSelectorProps {
  onSizeChange: (size: ScreenSize) => void;
  currentSize: ScreenSize;
}

const PRESETS = [
  { name: "Tablet (Portrait)", width: 768, height: 1024 },
  { name: "Tablet (Landscape)", width: 1024, height: 768 },
];

export const ScreenSizeSelector: React.FC<ScreenSizeSelectorProps> = ({ onSizeChange, currentSize }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customWidth, setCustomWidth] = useState(currentSize.width.toString());
  const [customHeight, setCustomHeight] = useState(currentSize.height.toString());
  const { editMode } = useDashboard();

  const handlePresetClick = (preset: { width: number; height: number }) => {
    onSizeChange(preset);
    setCustomWidth(preset.width.toString());
    setCustomHeight(preset.height.toString());
  };

  const handleCustomSubmit = () => {
    const width = parseInt(customWidth);
    const height = parseInt(customHeight);
    if (!isNaN(width) && !isNaN(height) && width > 0 && height > 0) {
      onSizeChange({ width, height });
    }
  };

  useEffect(() => {
    if (editMode) {
      setIsOpen(false);
    }
  }, [editMode]);

  return (
    <>
      {editMode.editMode && (
        <div className="screen-size-selector">
          <button className="animate-appear" onClick={() => setIsOpen(!isOpen)}>
            📐
          </button>

          {isOpen && (
            <div className="screen-size-dropdown h-column surface">
              <div className="screen-size-presets h-column">
                <h4>Presets</h4>
                {PRESETS.map((preset) => (
                  <button key={preset.name} className="preset-button" onClick={() => handlePresetClick(preset)}>
                    <span>{preset.name}</span>
                    <span>
                      {preset.width} × {preset.height}
                    </span>
                  </button>
                ))}
              </div>
              <hr></hr>
              <div className="h-column gap-large">
                <h4>Custom Size</h4>
                <div className="h-row">
                  <input
                    type="number"
                    placeholder="Width"
                    value={customWidth}
                    onChange={(e) => setCustomWidth(e.target.value)}
                  />
                  <span>×</span>
                  <input
                    type="number"
                    placeholder="Height"
                    value={customHeight}
                    onChange={(e) => setCustomHeight(e.target.value)}
                  />
                  <button onClick={handleCustomSubmit}>Apply</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
