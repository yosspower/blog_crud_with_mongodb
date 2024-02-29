const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const secret_key = "enji122u3u31g12tf21f31";
async function login(req, res) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json({ errors: error.errors[0].msg });
  }
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send({ msg: "User not found" });
  }

  const btoken = jwt.sign({ email: req.body.email }, secret_key, {
    expiresIn: "2h",
  });
  let token = "Bearer " + btoken;

  res.send(token);
}
function loginPage(req, res) {
  res.send(`
    <h2>Login</h2>
    <form action="/login" method="POST">
        <label for="EMAIL">Email:</label>
        <input type="email" name="email" required>
        <input type="submit" value="Login">
    </form>
    `);
}

function registerPage(req, res) {
  res.send(`
    <h2>Login</h2>
    <form action="/register" method="POST">
        <label for="name">Name :</label>
        <input type="text" id="name" name="name" required>
        <label for="EMAIL">Email:</label>
        <input type="email" name="email" required>
        <label for="Age">Age:</label>
        <input type="number" name="age" required>
        <input type="submit" value="Login">
    </form>
    `);
}

async function register(req, res) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json(error.errors[0].msg);
  }
  const { name, email, age } = req.body;
  const newUser = await new User({
    name,
    email,
    age,
  });

  newUser
    .save()
    .then(() => {
      const btoken = jwt.sign({ email: req.body.email }, secret_key, {
        expiresIn: "2h",
      });
      let token = "Bearer " + btoken;
      res.send(token);
    })
    .catch((err) => {
      res.send(`email : ${email} already used`);
    });
}

module.exports = { login, loginPage, register, registerPage };
