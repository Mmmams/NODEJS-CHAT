import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    display: "flex",
    margin: "10px",
  },
  container: {
    width: "70vw",

    margin: "10px auto",
    padding: "10px",
  },
  own: {
    backgroundColor: "#C3A1E9",
    padding: "5px",
    marginLeft: "auto",
  },
}));

const Messages = ({ messages, user_id }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {messages.map((msg) => (
        <div className={classes.root} key={msg._id}>
          {msg.user_id === user_id ? (
            <div className={classes.own}>{msg.text}</div>
          ) : (
            <div>
              {msg.userName}: {msg.text}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Messages;
