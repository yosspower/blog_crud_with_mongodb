const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const jwt = require("jsonwebtoken");
const isAuth = require("../middleware/isAuth");
const { login, loginPage } = require("../controllers/userController");

router.use(isAuth);

router.use(express.urlencoded({ extended: true }));
// /login :post methode
router.post(
  "/",
  [body("email").isEmail().withMessage("this field should be a EMAIL").trim()],
  login,
);
// /login :get methode
router.get("/page", loginPage);

module.exports = router;
