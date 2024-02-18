const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth")
const messageRoutes = require("./routes/messages");

const port = process.env.PORT || 5000; // Use port 3000 if PORT environment variable is not set

const app = express(); // corrected variable name

require("dotenv").config();

const socket = require("socket.io");

app.use(cors());
app.use(express.json());

//  DataBase Connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

  app.use("/api/auth",authRouter);
  app.use("/api/messages", messageRoutes);


  const server = app.listen(port, () => {
    console.log(`server started on PORT ${port}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:5000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});