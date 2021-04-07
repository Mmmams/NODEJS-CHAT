import { BrowserRouter, Switch, Route } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";
import { UserContext } from "./UserContext";
import Chat from "./components/chat/chat.jsx";
import Home from "./components/home/home";
import Navbar from "./layout/Navbar";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";

function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <div className="App">
        <UserContext.Provider value={{ user, setUser }}>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/chat/:room_id/:room_name" component={Chat} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </UserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
