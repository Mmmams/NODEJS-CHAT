import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { UserContext } from "./UserContext";

import "./App.css";

import Chat from "./components/chat/chat";
import Home from "./components/home/home";
import Navbar from "./layout/Navbar";

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
          </Switch>
        </UserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
