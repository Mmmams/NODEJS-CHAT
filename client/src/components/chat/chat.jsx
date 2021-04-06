import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Messages from "./messages";

import { useParams } from "react-router-dom";
import io from "socket.io-client";
let socket;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    margin: "0 auto",
    width: "70vw",
  },
  btn: {
    width: "20vw",
    margin: "10px auto",
  },
}));

const Chat = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      console.log(message);
      socket.emit("sendMessage", message, room_id, () => {
        setMessage("");
      });
    }
  };
  const ENDPOINT = "localhost:5500";
  const { room_id, room_name } = useParams();

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("join", { userName: "mams", room_id, user_id: "123" });
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  useEffect(() => {
    socket.emit("get-messages-history", room_id);
    socket.on("output-messages", (messages) => {
      setMessages(messages);
    });
  }, []);

  return (
    <div>
      <h1>{room_name}</h1>
      <Messages messages={messages} user_id="123" />
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={sendMessage}
      >
        <TextField
          id="outlined-basic"
          label="message"
          variant="outlined"
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(event) =>
            event.key === "enter" ? sendMessage(event) : null
          }
          value={message}
        />
        <Button type="submit" className={classes.btn}>
          Send message
        </Button>
      </form>
    </div>
  );
};

export default Chat;
