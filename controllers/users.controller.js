const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/user.model"); 
const { generateToken } = require("../helpers/jwt");

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

const userController = {
  registerUser: async (req, res) => {
    const { name, email, password, bio } = req.body;

    const hashedPassword = await bcrypt.hash(password.trim(), 10);
    const newUser = new User({ name, email, password: hashedPassword, bio, active:false });

    await newUser.save();
    await User.findOne({_id: newUser._id});
    res.status(201).json({ message: "User created successfully", id: newUser._id });
  },

  validateUser: async(req,res) => {
    const id =req.params.id
    const user = await User.findOneAndUpdate({_id: id}, { active: true}, { new: true})
    console.log(user)
    if(!user){
      res.json({error: true, message: 'user cannot be validate'})
    }
    res.json(user)
  },

  loginUser:async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user || user.active === false) {
        return res.status(401).json({ message: "Invalid credentials or inactive account" });
      }
  
      const token = generateToken(user._id);
      res.json({ message: "Login successful", token });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Error logging in" });
    }
  }
};

module.exports = userController;;