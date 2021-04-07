import React, { useState, useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import io from "socket.io-client";
let socket;

const useStyles = makeStyles({
  container: {
    flexGrow: 2,
  },
  root: {
    minWidth: 275,
    flexGrow: 1,
    margin: 20,
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
});

export default function RoomCard() {
  const ENDPOINT = "localhost:5500";

  const match = useRouteMatch();
  const history = useHistory();
  const classes = useStyles();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    socket = io(ENDPOINT);
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  });

  useEffect(() => {
    socket.on("output-rooms", (rooms) => {
      setRooms(rooms);
    });
  }, []);

  useEffect(() => {
    socket.on("room-created", (room) => {
      setRooms([...rooms, room]);
    });
  }, [rooms]);

  return (
    <div className={classes.container}>
      {rooms.map((room) => (
        <Card className={classes.root} variant="outlined" key={room._id}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {room.roomName}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {room._id}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => {
                history.push(`${match.path}chat/${room._id}/${room.roomName}`);
              }}
            >
              Connect room
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
