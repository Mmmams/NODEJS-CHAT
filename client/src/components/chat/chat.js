import React from "react";

import { useParams } from "react-router-dom";

const Chat = () => {
  const { room_id, room_name } = useParams();

  return (
    <div>
      <h1>{room_name}</h1>
      <h2>{room_id}</h2>
    </div>
  );
};

export default Chat;
