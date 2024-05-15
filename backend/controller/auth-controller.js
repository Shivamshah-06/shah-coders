const User = require("../model/user-model");
const bcryptjs = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { email, username, phone, password } = req.body;
    const userCreated = await User.findOne({ email: email });
    if (userCreated) {
      return res.status(400).json({ message: "email already exist" });
    }
    // const saltRound = 10;
    // const hash_password = await bcryptjs.hash(password, saltRound);

    const user = await User.create({
      email,
      username,
      phone,
      password,
    });
    console.log(user);
    res.status(200).json({
      message: "Registration Sucessful",
      token: await user.generateToken(),
      userId: user._id.toString(),
    });
  } catch (error) {
    // req.status(500).json({ message: error });
    next(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credential" });
    }
    const user = await userExist.comparePassword(password);
    if (!user) {
      return res.status(401).json({ message: "Invalid Credential" });
    }
    res.status(200).json({
      message: "Login Sucessful",
      token: await userExist.generateToken(),
      userId: userExist._id.toString(),
    });
  } catch (error) {
    req.status(500).json({ message: error });
    console.log(error);
  }
};

const user = async (req, res) => {
  try {
    const userData = req.user;
    // console.log(userData);
    // console.log(req.token);
    res.status(200).json({ userData });
  } catch (error) {
    console.log(error);
  }
};

// const hii = async (req, res) => {
//   try {
//     res.status(201).send("hii from router");
//   } catch (error) {
//     console.log(error);
//   }
// };
module.exports = { register, login, user };
