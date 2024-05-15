const express = require("express");
const {
  getUser,
  getContactData,
  deleteUserById,
  getUserById,
  updateUserById,
  deleteContactById,
} = require("../controller/admin-controller");
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");
const adminRouter = express.Router();

adminRouter.route("/users").get(authMiddleware, adminMiddleware, getUser);
adminRouter
  .route("/contacts")
  .get(authMiddleware, adminMiddleware, getContactData);
adminRouter
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, deleteUserById);
adminRouter
  .route("/users/:id")
  .get(authMiddleware, adminMiddleware, getUserById);
adminRouter
  .route("/users/update/:id")
  .patch(authMiddleware, adminMiddleware, updateUserById);
adminRouter
  .route("/contacts/delete/:id")
  .delete(authMiddleware, adminMiddleware, deleteContactById);
module.exports = adminRouter;
