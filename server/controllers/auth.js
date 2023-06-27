import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const register = async (req, res) => {
  // register user
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    // protect password using hashing
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "User with this email is already registered!" });
    }
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  // login user
  try {
    const { email, password } = req.body;

    // check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User doesnot exist." });
    }

    // validate password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // generate auth token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        friends: user.friend,
        location: user.location,
        occupation: user.occupation,
        viewedProfile: user.viewedProfile,
        impressions: user.impressions,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
