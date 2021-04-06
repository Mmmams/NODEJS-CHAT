import React from "react";

import "./home.styles.scss";

import CreateRoomCard from "../createRoomCard/createRoomCard";
import RoomCard from "../roomCard/roomCard";

const Home = () => {
  return (
    <div className="home-container">
      <CreateRoomCard />
      <RoomCard />
    </div>
  );
};

export default Home;
