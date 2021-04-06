import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";

import Chat from "./components/chat/chat.jsx";
import Home from "./components/home/home";
import Navbar from "./layout/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/chat/:room_id/:room_name" component={Chat} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
