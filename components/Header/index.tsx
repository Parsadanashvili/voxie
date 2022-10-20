import Image from "next/image";
import React, { useState } from "react";
import Container from "../Container";
import {
  UserIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Dropdown, {
  DropdownItem,
  DropdownItemIcon,
  DropdownItemText,
} from "../Dropdown";
import styles from "./Header.module.css";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (anchorEl) {
      handleClose();
    } else {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className={styles.wrapper}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.left}>
            <div className={styles.logo}>Voxie</div>
          </div>

          <div className={styles.right}>
            <div className={styles.profile} onClick={handleClick}>
              <h3>@parsadanashvili</h3>
              <Image
                className={styles.picture}
                src={"/imgs/profile.png"}
                width={56}
                height={56}
                objectFit={"fill"}
              />
            </div>

            <Dropdown anchorEl={anchorEl} open={open} onClose={handleClose}>
              <DropdownItem>
                <DropdownItemIcon>
                  <UserIcon />
                </DropdownItemIcon>
                <DropdownItemText>Profile</DropdownItemText>
              </DropdownItem>
              <DropdownItem>
                <DropdownItemIcon>
                  <ArrowLeftOnRectangleIcon />
                </DropdownItemIcon>
                <DropdownItemText>Log Out</DropdownItemText>
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
