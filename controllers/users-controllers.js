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
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(409).json({ message: "User already exists" });
  }
  user = new User({
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

const getUserByEmail = async (req, res, next) => {
  const email = req.params.email;
  console.log(`getUserByEmail ${email}`);
  let user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ user });
};

const updateUserByEmail = async (req, res, next) => {
  const email = req.params.email;
  console.log(`updateUserByEmail ${email}`);
  let user = await User.findOneAndUpdate(
    { email },
    {
      name: req.body.name,
      description: req.body.description,
      imgUrl: req.body.imgUrl,
    }
  );
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user = await user.save();
  if (!user) {
    return res.status(500).json({ message: "Cannot update user" });
  }
  return res.status(200).json({ message: "User update successfully" });
};

const deleteAllUsers = (req, res) => {
  console.log("deleteAllUsers");
  User.deleteMany({})
    .then(() => {
      console.log("All users deleted");
      return res.status(200).json({ message: "All users deleted" });
    })
    .catch((error) => {
      console.log(`error in deleteAllUsers: ${error}.`);
      return res.status(500).json({ message: error.message });
    });
};

exports.getAllUsers = getAllUsers;
exports.createNewUser = createNewUser;
exports.getUserByEmail = getUserByEmail;
exports.updateUserByEmail = updateUserByEmail;
exports.deleteAllUsers = deleteAllUsers;
