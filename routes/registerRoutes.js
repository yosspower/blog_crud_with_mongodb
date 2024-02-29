const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const jwt = require("jsonwebtoken");
const isAuth = require('../middleware/isAuth');
const {register,registerPage } = require("../controllers/userController");




router.use(isAuth);


router.use(express.urlencoded({ extended: true }));
// /login :post methode
router.post(
  "/",
  [
    body("email")
      .isEmail()
      .withMessage("this field should be a EMAIL")
      .trim()
      .notEmpty(),
    body("name")
    .isString()
    .withMessage('name must be string')
      .isLength({ min: 4, max: 20 })
      .withMessage("name must be between 4 and 20 characters")
      .trim()
      .notEmpty(),
      body("age")
      .isNumeric()
      .isLength({max:99,min:1})
      .withMessage("Age must be number  from 1 to 99")
  ],
  register,
);
// /login :get methode
router.get("/", registerPage);



module.exports = router;
