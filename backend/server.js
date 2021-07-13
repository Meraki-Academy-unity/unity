const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db/db");
const socket = require("socket.io");

const app = express();

//routers
const signUp = require("./routers/routes/auth/signUp");
const travelPlansRouter = require("./routers/routes/travel_plans");
const login = require("./routers/routes/auth/login");
const friendListRouter = require("./routers/routes/friendList");
const activitiesRouter = require("./routers/routes/activity");
const preferencesRouter = require("./routers/routes/preferences");
const profileRouter = require("./routers/routes/users");
const ImagesRouter = require("./routers/routes/images");
const MessagesRouter = require("./routers/routes/messages");

//built-in middlewares
app.use(express.json());

//third-party middleware
app.use(cors());

//app routers
app.use("/signUp", signUp);
app.use("/login", login);
app.use("/travelPlans", travelPlansRouter);
app.use("/activities", activitiesRouter);
app.use("/friends", friendListRouter);
app.use("/preferences", preferencesRouter);
app.use("/users", profileRouter);
app.use("/photoAlbum", ImagesRouter);
app.use("/messages", MessagesRouter);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server On ${PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data.content);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
