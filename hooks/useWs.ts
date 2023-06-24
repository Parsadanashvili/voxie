import { WebSocketContext } from "@contexts/WebSocketContext";
import { useContext } from "react";

const useWs = () => {
  const { socket } = useContext(WebSocketContext);

  return {
    ...socket,
  };
};

export default useWs;
