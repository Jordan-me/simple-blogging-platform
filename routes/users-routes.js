const express = require("express");
const usersController = require("../controllers/users-controllers");
const router = express.Router();
const Users = require("../models/User");
// rout checking
router.get("/", (req, res) => {
  res.send("Hello Users!");
});
// Get all Users
router.get("/users", usersController.getAllUsers);
// with middleware: router.get("/",mid-function, usersController.getAllUsers);
// create new user
router.post("/users", usersController.createNewUser);
module.exports = router;
