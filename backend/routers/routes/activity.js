const express = require("express");

const {addActivity} = require("../controllers/activity");

const activitiesRouter = express.Router();

activitiesRouter.post("/:id",addActivity); 

module.exports =activitiesRouter;