import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import ScrollToBottom from "react-scroll-to-bottom";
const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    padding: theme.spacing(1),
    display: "flex",
    margin: "10px",
  },
  container: {
    width: "70vw",

    height: "69vh",
    margin: "10px auto",
    padding: "10px",
  },
  own: {
    padding: "5px",
    marginLeft: "auto",
  },
  notOwn: {
    padding: "5px",
    marginRight: "auto",
  },
}));

const Messages = ({ messages, user_id }) => {
  const classes = useStyles();

  return (
    <ScrollToBottom className={classes.container}>
      {messages.map((msg) => (
        <div className={classes.root} key={msg._id}>
          {msg.user_id !== user_id ? (
            <div className={classes.notOwn}>
              {msg.userName}:{msg.text}
            </div>
          ) : (
            <div className={classes.own}>
              {msg.userName}: {msg.text}
            </div>
          )}
        </div>
      ))}
    </ScrollToBottom>
  );
};

export default Messages;
