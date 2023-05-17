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
// get user by its email
router.get("/users/:email", usersController.getUserByEmail);
// update user by its email - can use also with put method, with patch we can update only some fields.
router.patch("/users/:email", usersController.updateUserByEmail);
// delete all users
router.delete("/users", usersController.deleteAllUsers);
module.exports = router;
