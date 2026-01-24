import React, { ReactNode } from "react";
import "./modal.css";
import { IoMdClose } from "react-icons/io";
import { createPortal } from "react-dom";

type ModalProps = {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ title, children, open, onClose }) => {
  if (!open) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div onClick={onClose} className="modal-close">
          {" "}
          <IoMdClose />{" "}
        </div>
        <div className="modal-title">{title}</div>
        {children}
      </div>
    </div>,
    document.body,
  );
};
