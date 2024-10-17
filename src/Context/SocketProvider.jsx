import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to the server
    const newSocket = io(import.meta.env.VITE_BACKEND_URL);
    setSocket(newSocket);

    // Listen for the connect event
    newSocket.on('connect', () => {
      // console.log('Connected to server');
      // console.log('Socket ID:', newSocket.id); // Log the socket ID
      // console.log('Connected status:', newSocket.connected); // Should print true
      newSocket.emit('join', 'Vishal');
    });

    // Listen for the disconnect event
    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      console.log('Connected status:', newSocket.connected); // Should print false
    });

    // Clean up the connection when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
