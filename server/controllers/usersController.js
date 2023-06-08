const User = require("../models/User");
const bcrypt = require("bcrypt");




const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString("en-US", {
  month: "2-digit",
  day: "2-digit",
  year: "numeric",
});

//get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get user by id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//create user
exports.createUser = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10); //hashes password before saving to database
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    createdAt: formattedDate,
    updatedAt: formattedDate,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//update user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.body.name != null) {
      user.name = req.body.name;
    }

    if (req.body.email != null) {
      user.email = req.body.email;
    }

    if (req.body.password != null) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    user.updatedAt = formattedDate;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.remove();
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete all users
exports.deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany({});
    res.json({ message: "All users deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

