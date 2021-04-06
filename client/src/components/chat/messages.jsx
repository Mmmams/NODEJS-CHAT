import React from "react";

const Messages = ({ messages, user_id }) => {
  return <div>{JSON.stringify(messages)}</div>;
};

export default Messages;
