import React from "react";

const Notification = ({ notification, anecdote }) => {
  if (notification === null) return null;

  return <div>{notification}</div>;
};

export default Notification;
