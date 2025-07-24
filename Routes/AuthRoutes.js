const express = require("express");
const router = express.Router();

const {
  isAuthenticated,
  SignUp,
  LoginController,
  logoutController,
  IsAdmin
} = require("../Controller/AuthController");

router.get("/isAuthenticated", isAuthenticated);
router.post("/signup", SignUp);
router.post("/login", LoginController);
router.post("/logout", logoutController);
router.get("/isAdmin", IsAdmin);

module.exports = router;
