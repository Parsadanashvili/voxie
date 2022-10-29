import Card from "@components/Card";
import React, { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

interface ModalProps {
  children?: ReactNode;
  title?: ReactNode;
  open: boolean;
  onClose?: Function;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children, title }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  const handleClose = () => {
    if (onClose) onClose();
  };

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  return open && isBrowser
    ? ReactDOM.createPortal(
        <div className={styles.root}>
          <div className={styles.wrapper}>
            <Card width={400}>
              {title && <ModalHeader>{title}</ModalHeader>}
              {children}
            </Card>
          </div>

          <div className={styles.overlay} onClick={handleClose}></div>
        </div>,
        document.getElementById("modal-root")!
      )
    : null;
};

interface ModalHeaderProps {
  children?: ReactNode;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ children }) => {
  return <div className={styles.header}>{children}</div>;
};

export default Modal;
