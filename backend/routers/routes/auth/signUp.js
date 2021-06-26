const express = require("express");

const { signUp } = require("./../../controllers/auth/signUp");

const createUser = express.Router();

createUser.post("/",signUp);

module.exports = createUser;