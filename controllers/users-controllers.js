const User = require("../models/User");

const getAllUsers = async (req, res, next) => {
  console.log("getAllUsers");
  try {
    const users = await User.find();
    if (!users) {
      console.log("No users found");
      return res.status(404).json({ message: "No users found" });
    }
    console.log(`getAllUsers: ${users}`);
    return res.status(200).json({ users });
  } catch (error) {
    console.log(`error in getAllUsers: ${error}.`);
    return res.status(500).json({ message: error.message });
  }
};
const createNewUser = async (req, res, next) => {
  let user = new User({
    email: req.body.email,
    name: req.body.name,
    description: req.body.description,
    imgUrl: req.body.imgUrl,
  });
  console.log("createNewUser");
  try {
    const savedUser = await user.save();
    if (!savedUser) {
      return res.status(500).json({ message: "Cannot add user" });
    }
    console.log(`createNewUser: ${savedUser}`);
    return res.status(201).json({ savedUser });
  } catch (error) {
    console.log(`error in createNewUser: ${error}.`);
    return res.status(500).json({ message: error.message });
  }
};
exports.getAllUsers = getAllUsers;
exports.createNewUser = createNewUser;
