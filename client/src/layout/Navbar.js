import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

import SvgIcon from "@material-ui/core/SvgIcon";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const Navbar = () => {
  const history = useHistory();
  const match = useRouteMatch();
  return (
    <AppBar position="static">
      <Toolbar>
        <HomeIcon
          onClick={() => {
            history.push("/");
          }}
        />
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
        <Button color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
