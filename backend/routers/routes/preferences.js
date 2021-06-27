const express = require("express");

const preferencesRouter = express.Router();

preferencesRouter.post("/:id", addPreference);
preferencesRouter.delete("/:id", deletePreference);
preferencesRouter.get("/:id", showPreferenceById);

module.exports = preferencesRouter;
