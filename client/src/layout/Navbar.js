import React, { useContext } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { UserContext } from "../UserContext";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const logout = async () => {
    try {
      const res = await fetch("http://localhost:5500/logout", {
        credentials: "include",
      });
      const data = res.json();
      console.log("logout data", data);
      setUser(null);
      console.log(user);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const history = useHistory();
  const match = useRouteMatch();
  return (
    <AppBar position="static">
      <Toolbar>
        {!user ? (
          <div>
            <Button
              color="inherit"
              onClick={() => {
                history.push(`${match.path}login`);
              }}
            >
              Login
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                history.push(`${match.path}signup`);
              }}
            >
              Signup
            </Button>
          </div>
        ) : (
          <div>
            <Button
              color="inherit"
              onClick={() => {
                history.push("/");
              }}
            >
              HOME
            </Button>

            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
