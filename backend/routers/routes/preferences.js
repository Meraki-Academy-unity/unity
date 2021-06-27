const express = require("express");

const preferencesRouter = express.Router();

const {
  addPreference,
  deletePreference,
  showPreferenceById,
  updatePreferenceById
} = require("../controllers/preferences");

preferencesRouter.post("/", addPreference);
preferencesRouter.delete("/", deletePreference);
preferencesRouter.get("/", showPreferenceById);
preferencesRouter.put("/", updatePreferenceById);

module.exports = preferencesRouter;
