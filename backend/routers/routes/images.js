const express = require("express");
const authentication = require('../middlewares/authentication')


const ImagesRouter = express.Router();

const { addImage,getImageByUserId } = require("../controllers/images");


ImagesRouter.post("/", authentication,addImage)
ImagesRouter.get("/", authentication,getImageByUserId)

module.exports = ImagesRouter;
