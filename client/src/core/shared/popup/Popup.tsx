import { useEffect, useRef, useState } from "react";
import "./Popup.css";
import React from "react";

interface PopupProps {
  children: (closePopup: () => void) => React.ReactNode[] | React.ReactNode[];
  closePopupSeconds?: number;
}

const PopupButton: React.FC<PopupProps> = ({ children, closePopupSeconds }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [cords, setCords] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const closePopup = () => setShowPopup(false);
  const [trigger, content] = typeof children === "function" ? children(closePopup) : children;

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

    setCords({
      top: rect.top - 50,
      left: rect.left + rect.width / 2,
    });

    setShowPopup((prev) => !prev);
  };

  useEffect(() => {
    if (!showPopup) return;

    if (closePopupSeconds) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, closePopupSeconds * 1000);

      return () => clearTimeout(timer);
    }
  }, [showPopup, closePopupSeconds]);

  useEffect(() => {
    if (!showPopup) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPopup]);

  return (
    <div className="popup-container" ref={containerRef}>
      <div onClick={(e) => handleClick(e)}>{trigger}</div>
      {showPopup && (
        <div className="popup" style={{ top: cords.top, left: cords.left }}>
          {content}
        </div>
      )}
    </div>
  );
};

export default PopupButton;
