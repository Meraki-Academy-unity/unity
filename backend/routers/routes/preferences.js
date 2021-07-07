const express = require("express");
const authentication = require("../middlewares/authentication");


const preferencesRouter = express.Router();

const {
  addPreference,
  deletePreference,
  showPreferenceById,
  updatePreferenceById,
  matchByLocation,
  matchByDate,
  matching,
  showPreferenceByUser
} = require("../controllers/preferences");

preferencesRouter.post("/", addPreference);
preferencesRouter.delete("/", deletePreference);
preferencesRouter.get("/", showPreferenceById);
preferencesRouter.get("/user", authentication, showPreferenceByUser);
preferencesRouter.put("/", updatePreferenceById);
preferencesRouter.get("/locationMatch", authentication, matchByLocation)
preferencesRouter.get("/dateMatch", authentication, matchByDate)
preferencesRouter.get("/match", authentication, matching)
module.exports = preferencesRouter;
