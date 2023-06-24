import { WebSocketContext } from "@contexts/WebSocketContext";
import useAuth from "@hooks/useAuth";
import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

let url = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

interface WebSocketProviderProps {
  children: ReactNode;
}

const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const { status } = useAuth();
  const [conn, setConn] = useState<Socket | null>(null);
  const isConnecting = useRef(false);

  useEffect(() => {
    if (!conn && !isConnecting.current && status == "authenticated") {
      (async () => {
        isConnecting.current = true;

        await fetch("/api/socket");
        setConn(io());

        isConnecting.current = true;
      })();
    }
  }, [conn, status]);

  useEffect(() => {
    if (conn) {
      conn.on("connection", (socket: Socket) => {
        socket.on("leave-room", function () {
          console.log("Leaving room");
        });
      });
    }
  }, [conn]);

  return (
    <WebSocketContext.Provider
      value={useMemo(
        () => ({
          socket: conn,
        }),
        [conn]
      )}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
