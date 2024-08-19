// src/context/SocketContext.tsx
import { authKey } from "@/constants/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

interface SocketContextProps {
  socket: Socket | null;
  onlineUser: string[];
}

const SocketContext = createContext<SocketContextProps>({
  socket: null,
  onlineUser: [],
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUser, setOnlineUser] = useState<string[]>([]);
  const [token, setToken] = useState<string | null>(null);
  console.log(onlineUser);

  useEffect(() => {
    // Get token from localStorage or some async API (e.g., authentication context)
    const savedToken = localStorage.getItem(authKey);
    if (savedToken) {
      setToken(savedToken); // Set token when found
    }
  }, []);

  useEffect(() => {
    if (!token) return; // Only create socket connection when token is available

    const socketConnection = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
      auth: {
        token: token, // Use token in socket auth
      },
    });

    socketConnection.on("onlineUser", (data) => {
      setOnlineUser(data); // Update onlineUser in context
    });

    setSocket(socketConnection); // Set socket in state

    return () => {
      socketConnection.disconnect(); // Clean up when component unmounts
    };
  }, [token]); // Only run this effect when token is set

  return (
    <SocketContext.Provider value={{ socket, onlineUser }}>
      {children}
    </SocketContext.Provider>
  );
};
