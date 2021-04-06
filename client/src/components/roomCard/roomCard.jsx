import React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    flexGrow: 2,
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
  const match = useRouteMatch();
  const history = useHistory();
  const classes = useStyles();
  const rooms = [
    { name: "room1", _id: 123 },
    { name: "room2", _id: "qwe" },
  ];
  return (
    <div>
      {rooms.map((room) => (
        <Card className={classes.root} variant="outlined" key={room._id}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {room.name}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {room._id}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() =>
                history.push(`${match.path}chat/${room._id}/${room.name}`)
              }
            >
              Connect room
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
