const express = require("express");
const authentication = require("../middlewares/authentication");


const preferencesRouter = express.Router();

const {
  addPreference,
  deletePreference,
  showPreferenceById,
  updatePreferenceById,
  matchByLocation,
  matchByDate
} = require("../controllers/preferences");

preferencesRouter.post("/", addPreference);
preferencesRouter.delete("/", deletePreference);
preferencesRouter.get("/", showPreferenceById);
preferencesRouter.put("/", updatePreferenceById);
preferencesRouter.get("/locationMatch", authentication, matchByLocation)
preferencesRouter.get("/dateMatch", authentication, matchByDate)
module.exports = preferencesRouter;
