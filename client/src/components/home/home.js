import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import "./home.styles.scss";
import { UserContext } from "../../UserContext.js";
import CreateRoomCard from "../createRoomCard/createRoomCard";
import RoomCard from "../roomCard/roomCard";

const Home = () => {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="home-container">
      <CreateRoomCard />
      <RoomCard />
    </div>
  );
};

export default Home;
