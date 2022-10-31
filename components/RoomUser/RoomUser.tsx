import { User } from "../../types";
import Image from "next/image";
import React from "react";
import styles from "./RoomUser.module.css";

interface RoomUserProps {
  user: User;
  isSpeaking?: boolean;
  isMuted?: boolean;
}

const RoomUser: React.FC<RoomUserProps> = ({ user, isSpeaking, isMuted }) => {
  return (
    <div className={styles.root}>
      <div className={`${styles.avatar}`}>
        <Image
          src={user?.avatar ?? ""}
          width={120}
          height={120}
          objectFit={"cover"}
        />
      </div>

      <div className={styles.username}>{user?.username}</div>
    </div>
  );
};

export default RoomUser;
