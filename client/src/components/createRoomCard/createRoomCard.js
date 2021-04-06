import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
} from "@material-ui/core";
import io from "socket.io-client";

let socket;

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    flexGrow: 3,
    margin: 20,
    backgroundColor: "whitesmoke",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  btn: {
    margin: 10,
  },
});

export default function CreateRoomCard() {
  const ENDPOINT = "localhost:5500";
  useEffect(() => {
    socket = io(ENDPOINT);
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  });

  const classes = useStyles();
  const [room, setRoom] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit("create-room", room, () => {
      setRoom("");
    });
  };

  const handleInput = (event) => {
    setRoom(event.target.value);
  };

  return (
    <Card className={classes.root}>
      <FormControl>
        <form onSubmit={handleSubmit}>
          <InputLabel htmlFor="my-input">Room name</InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            onChange={handleInput}
          />
          <FormHelperText id="my-helper-text">
            Create your own room, or connect to exist.
          </FormHelperText>
          <Button type="submit" className={classes.btn}>
            Create room
          </Button>
        </form>
      </FormControl>
    </Card>
  );
}
