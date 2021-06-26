const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db/db");

const app = express();

//routers
const signUp = require("./routers/routes/auth/signUp");

//built-in middlewares
app.use(express.json());

//third-party middleware
app.use(cors());

//app routers
app.use("/signUp", signUp);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server On ${PORT}`);
});
