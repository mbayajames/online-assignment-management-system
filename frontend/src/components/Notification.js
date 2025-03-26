import React, { useEffect } from 'react';

const Notification = ({ message, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Logic to dismiss the notification after the specified duration
      // This could be achieved via props or state management, e.g., a callback to clear the message
      // For simplicity, this example just logs to console
      console.log("Notification dismissed");
    }, duration);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [duration]);

  return (
    <div className="notification">
      {message}
    </div>
  );
};

export default Notification;