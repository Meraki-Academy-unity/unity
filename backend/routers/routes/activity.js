const express = require("express");

const {createActivity} = require("../controllers/activity");

const activityRouter = express.Router();

activityRouter.post("/",createActivity ); 


module.exports =activityRouter;