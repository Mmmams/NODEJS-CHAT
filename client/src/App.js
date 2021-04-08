import { BrowserRouter, Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import { UserContext } from "./UserContext";
import Chat from "./components/chat/chat.jsx";
import Home from "./components/home/home";
import Navbar from "./layout/Navbar";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await fetch("http://localhost:5500/verifyuser", {
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        console.log(data);
        setUser(data);
      } catch (error) {
        console.log("error", error);
      }
    };
    verifyUser();
  }, []);

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
