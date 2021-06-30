const express = require("express");
const authentication = require('../middlewares/authentication')


const ImagesRouter = express.Router();

const { addImage } = require("../controllers/images");


ImagesRouter.post("/", authentication,addImage)

module.exports = ImagesRouter;
