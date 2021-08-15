const express = require("express");
const cors = require("cors");
const path = require("path")
const faculty_Router = require("./router/facultyRouter");
const mailRouter = require("./router/mailRouter");
const eventRouter = require("./router/eventRouter");
const viewRouter = require("./router/viewRouter");
const { isLoggedIn } = require("./controller/authController");
const authRouter = require("./router/authRouter");

const app = express();
app.use(express.json());
app.use(cors());
var cookieParser = require('cookie-parser')
app.set("view engine" , "ejs");
app.set("views", path.join(__dirname, "view"));
app.use(express.static(__dirname+"/public"));
app.use(cookieParser())


app.use("/user",authRouter);
app.use("/faculty", faculty_Router);
app.use("/mail", mailRouter)
app.use("/event", eventRouter)
app.use("",viewRouter)

let port = process.env.PORT || 4000;
app.listen(port, function () {
  console.log("server is listening at 4000 port !!");
});