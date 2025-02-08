import { useEffect, useRef } from 'react';

// WebSocket connection setup
const createSocketConnection = (url, onMessage, onError, onClose) => {
  const socket = new WebSocket(url);

  // Event listener for connection open
  socket.onopen = () => {
    console.log('WebSocket connection established.');
  };

  // Event listener for incoming messages
  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data); // Parse incoming message
      onMessage(data); // Pass data to the provided callback
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  };

  // Event listener for errors
  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
    onError(error); // Pass error to the provided callback
  };

  // Event listener for connection close
  socket.onclose = () => {
    console.log('WebSocket connection closed.');
    onClose(); // Notify when the connection is closed
  };

  return socket;
};

// Custom hook for managing WebSocket connection
const useWebSocket = (url, onMessage, onError, onClose) => {
  const socketRef = useRef(null);

  useEffect(() => {
    // Create WebSocket connection
    socketRef.current = createSocketConnection(url, onMessage, onError, onClose);

    // Cleanup function to close the connection
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [url, onMessage, onError, onClose]);

  // Function to send messages through the WebSocket
  const sendMessage = (message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not open.');
    }
  };

  return { sendMessage };
};

export default useWebSocket;