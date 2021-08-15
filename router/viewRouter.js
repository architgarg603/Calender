const express = require("express");
const { isLoggedIn } = require("../controller/authController");
const { getHome, getLogin, getRegister } = require("../controller/viewController");
const viewRouter = express.Router();

viewRouter.use(isLoggedIn)
viewRouter.get("/",getHome)
viewRouter.get("/login",getLogin)
viewRouter.get("/register",getRegister)

module.exports = viewRouter;