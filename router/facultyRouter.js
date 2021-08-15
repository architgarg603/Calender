const express = require("express");
const { isLoggedIn } = require("../controller/authController");
const { createFaculty, DeleteFaculty, getAllFaculty, getFacultyById, removeFacultyById } = require("../controller/facultyController");
const faculty_Router = express.Router();

faculty_Router.post("/add",createFaculty)
faculty_Router.post("/remove",DeleteFaculty)
faculty_Router.get("/get/all",getAllFaculty)
faculty_Router.post("/getid",getFacultyById)
faculty_Router.post("/del",removeFacultyById)

module.exports = faculty_Router;