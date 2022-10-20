import React, { ReactElement } from "react";
import Popover from "../Popover";
import styles from "./Dropdown.module.css";

interface Props {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  children: ReactElement | ReactElement[];
}

const Dropdown = ({ anchorEl, open, onClose, children }: Props) => {
  return open ? (
    <Popover
      anchorEl={anchorEl}
      open
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      className={styles.wrapper}
    >
      <ul className={styles.menu}>{children}</ul>
    </Popover>
  ) : null;
};

export default Dropdown;
