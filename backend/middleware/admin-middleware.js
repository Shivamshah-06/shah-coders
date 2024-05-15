const adminMiddleware = async (req, res, next) => {
  try {
    const admin = req.user.isAdmin;
    if (!admin) {
      return res
        .status(404)
        .json({ message: "Access denied : User is not an admin" });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = adminMiddleware;
