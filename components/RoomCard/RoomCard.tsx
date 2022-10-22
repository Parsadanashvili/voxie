import Image from "next/image";
import React from "react";
import styles from "./RoomCard.module.css";

interface RoomProps {
  title: string;
}

interface RoomCardProps {
  room: RoomProps;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  return (
    <div className={styles.root}>
      <div className={styles.title}>{room.title}</div>

      <div className={styles.desc}>
        <div className={styles.subtitle}>Speakers:</div>

        <div className={styles.speakers}>
          {[1, 2, 3, 4].map((key) => (
            <div key={key} className={styles.avatar}>
              <Image
                src={"/imgs/avatar.jpg"}
                objectFit={"cover"}
                width={64}
                height={64}
              />
            </div>
          ))}
          <div className={`${styles.avatar} ${styles.more}`}>
            <div className={styles.badge}>+1</div>

            <Image
              src={"/imgs/profile.png"}
              objectFit={"cover"}
              width={64}
              height={64}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
