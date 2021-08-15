const express = require("express");
const { login, signup, isLoggedIn, logout } = require("../controller/authController");
const authRouter = express.Router();

authRouter.post("/login",login)
authRouter.post("/register",signup)
authRouter.post("/logout",logout)

module.exports = authRouter;