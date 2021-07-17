const express = require("express");

const {
  signUpFirstStep,
  signUpSecondStep,
} = require("./../../controllers/auth/signUp");

const createUser = express.Router();

createUser.post("/firstStep", signUpFirstStep);
createUser.put("/secondStep/:id", signUpSecondStep);

module.exports = createUser;
