import { MicIcon } from "@components/Icons";
import ExitIcon from "@components/Icons/ExitIcon";
import React from "react";
import styles from "./RoomControl.module.css";
import { Room } from "../../../types/room";
import useWs from "@hooks/useWs";
import { Socket } from "socket.io-client";

interface Props {
  room: Room;
}

const RoomControl = ({ room }: Props) => {
  const { emit }: Socket = useWs();

  let practicants = (room?._count?.users ?? 1) - 1;

  const handleMuteToggle = () => {
    //
  };

  const handleExit = () => {
    //
  };

  return (
    <div className={styles.root}>
      <div className={styles.info}>
        <div className={styles.name}>{room.title}</div>
        <div className={styles.practicants}>
          {`${practicants} ${practicants > 0 ? "other" : ""}`} practicants
        </div>
      </div>

      <button className={styles.button} onClick={handleMuteToggle}>
        <MicIcon muted />
      </button>

      <button
        className={`${styles.button} ${styles.danger}`}
        onClick={handleExit}
      >
        <ExitIcon />
      </button>
    </div>
  );
};

export default RoomControl;
