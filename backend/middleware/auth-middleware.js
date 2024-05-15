const jwt = require("jsonwebtoken");
const User = require("../model/user-model");
const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unathorized HTTP , Token not Provided" });
  }
  const jwtToken = token.replace("Bearer", "").trim();
  // console.log("token from auth", jwtToken);*
  try {
    const isVerified = jwt.verify(jwtToken, process.env.SECRET_KEY);
    // console.log(isVerified);
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });
    req.user = userData;
    req.token = token;
    req.userTd = userData._id;
    console.log(userData);
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unathorized HTTP ,Invalid  Token  Provided" });
  }
};

module.exports = authMiddleware;
