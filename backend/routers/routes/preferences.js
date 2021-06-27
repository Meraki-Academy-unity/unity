const express = require("express");

const preferencesRouter = express.Router();

const {
  addPreference,
  deletePreference,
  showPreferenceById,
} = require("../controllers/preferences");

preferencesRouter.post("/", addPreference);
preferencesRouter.delete("/", deletePreference);
preferencesRouter.get("/", showPreferenceById);

module.exports = preferencesRouter;
