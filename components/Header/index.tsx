import Image from "next/image";
import React from "react";
import Container from "../Container";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.wrapper}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.left}>
            <div className={styles.logo}>Voxie</div>
          </div>

          <div className={styles.right}>
            <div className={styles.profile}>
              <h3>@Parsadanashvili</h3>
              <Image
                className={styles.picture}
                src={"/imgs/profile.png"}
                width={56}
                height={56}
                objectFit={"fill"}
              />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
