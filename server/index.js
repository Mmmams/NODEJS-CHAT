const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(authRoutes);

const http = require("http").createServer(app);
const mongoose = require("mongoose");
const socketio = require("socket.io");
const io = socketio(http);
const PORT = process.env.PORT || 5500;
const mongodb =
  "mongodb+srv://Mams:password123456@cluster0.0vmvf.mongodb.net/chat-database?retryWrites=true&w=majority";
mongoose
  .connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected"))
  .catch((error) => console.log("ERR", error));
const { addUser, getUser, removeUser } = require("./helper");
const Message = require("./models/message");
const Room = require("./models/room");

app.get("set-cookies", (req, res) => {
  res.cookie("username", "Tony");
  res.cookie("isAuthenticated", true);
  res.send("cookies are set");
});

io.on("connection", (socket) => {
  Room.find().then((result) => {
    socket.emit("output-rooms", result);
  });
  socket.on("create-room", (roomName, callback) => {
    const room = new Room({ roomName });
    room.save().then((result) => {
      io.emit("room-created", result);
    });
    callback();
  });

  socket.on("join", ({ userName, room_id, user_id }) => {
    const { error, user } = addUser({
      socket_id: socket.id,
      userName,
      room_id,
      user_id,
    });
    if (error) {
      console.log("Join error ", error);
    } else {
      console.log("Join success ", user);
    }
  });

  socket.on("sendMessage", (message, room_id, callback) => {
    const user = getUser(socket.id);
    const msgToStore = {
      userName: user.userName,
      user_id: user.user_id,
      room_id,
      text: message,
    };
    console.log("message ", msgToStore);
    const msg = new Message(msgToStore);
    msg.save().then((result) => {
      io.emit("message", result);
      callback();
    });
  });
  socket.on("get-messages-history", (room_id) => {
    Message.find({ room_id }).then((result) => {
      socket.emit("output-messages", result);
    });
  });
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    console.log("USER IN REMOVE", user);
  });
});

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
