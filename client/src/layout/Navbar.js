import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit">Login</Button>
        <Button color="inherit">Signup</Button>
        <Button color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
