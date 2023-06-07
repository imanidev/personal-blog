const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a user
router.post("/", async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    createdAt: formattedDate,
    updatedAt: formattedDate,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a user by ID
router.patch("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.body.username != null) {
      user.username = req.body.username;
    }

    if (req.body.email != null) {
      user.email = req.body.email;
    }

    if (req.body.password != null) {
      user.password = req.body.password;
    }

    user.updatedAt = formattedDate;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
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
});

//delete all users
router.delete("/", async (req, res) => {
  try {
   
    const allUsers = await User.find();
   
    if (!allUsers) {
      return res.status(404).json({ message: "No users found" });
    }
   
    await allUsers.remove();
    
    res.json({ message: "Users deleted!" });
  } catch (error) {
  
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
