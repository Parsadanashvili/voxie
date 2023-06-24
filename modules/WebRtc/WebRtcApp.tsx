import useAuth from "@hooks/useAuth";
import React from "react";
import RoomControl from "./components/RoomControl";

const WebRtcApp = () => {
  const { user, status } = useAuth();

  if (user && status == "authenticated") {
    const { currentRoom } = user;

    return <>{currentRoom && <RoomControl room={currentRoom} />}</>;
  }

  return null;
};

export default WebRtcApp;
