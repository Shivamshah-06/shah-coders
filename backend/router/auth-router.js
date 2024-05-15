const express = require("express");
const router = express.Router();
const { register, login, user } = require("../controller/auth-controller");
const { contact } = require("../controller/contact-controller");
const validate = require("../middleware/validate-middleware");
const { signupSchema, loginSchema } = require("../validators/auth-validator");
const authMiddleware = require("../middleware/auth-middleware");
const { service } = require("../controller/service-controller");

router.route("/register").post(validate(signupSchema), register);
router.route("/login").post(validate(loginSchema), login);
router.route("/contact").post(contact);
router.route("/user").get(authMiddleware, user);
router.route("/service").get(service);
// router.get("/register", (req, res) => {
//   res.status(201).send("register from router");
// });
// router.route("/hii").get(hii);
module.exports = router;
