import Image from "next/image";
import React from "react";
import { Room } from "../../types";
import styles from "./RoomCard.module.css";

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  return (
    <div className={styles.root}>
      <div className={styles.title}>{room.title}</div>

      <div className={styles.desc}>
        <div className={styles.subtitle}>Speakers:</div>

        <div className={styles.speakers}>
          {room.users.slice(0, 10).map((user, index) => {
            const overlay =
              index + 1 == 10 && room.users.length > 10 ? styles.more : "";
            const cn = `${styles.avatar} ${overlay}`;

            return (
              <div key={user.username} className={cn}>
                {overlay && (
                  <div className={styles.badge}>
                    +{room.users.length - (index + 1)}
                  </div>
                )}

                <Image
                  src={user.avatar}
                  objectFit={"cover"}
                  width={64}
                  height={64}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
