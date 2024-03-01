const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const secret_key = "enji122u3u31g12tf21f31";
async function login(req, res) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json({ errors: error.errors[0].msg });
  }
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send({ msg: "User not found" });
  }
  const isPassword = await bcrypt.compareSync(password, user.password);
  if (!isPassword) {
    return res.status(400).send({ msg: "Invalid Password!" });
  }

  const btoken = jwt.sign({ email: req.body.email }, secret_key, {
    expiresIn: "24h",
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
        <label for="password">Password:</label>
        <input type="password" name="password" required>
        <input type="submit" value="Login">
    </form>
    `);
}

function registerPage(req, res) {
  res.send(`
    <h2>  Register </h2>
    <form action="/register" method="POST">
        <label for="name">Name :</label>
        <input type="text" id="name" name="name" required>
        <label for="EMAIL">Email:</label>
        <input type="email" name="email" required>
        <label for="password">password:</label>
        <input type="password" name="password" required>
        <input type="submit" value="Login">
    </form>
    `);
}

async function register(req, res) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json(error.errors[0].msg);
  }
  const { name, email, password } = req.body;
  const ifUserExists = await User.findOne({ email: email });
  if (ifUserExists) {
    return res.send("user already exists");
  }
  const hashePasswrd = await bcrypt.hash(password, 10);
  const newUser = await new User({
    name,
    email,
    password: hashePasswrd,
  });

  newUser
    .save()
    .then(() => {
      const btoken = jwt.sign(
        { email: req.body.email, role: "user" },
        secret_key,
        {
          expiresIn: "24h",
        },
      );
      let token = "Bearer " + btoken;
      res.send(token);
    })
    .catch((err) => {
      res.send(err.message);
    });
}

module.exports = { login, loginPage, register, registerPage };
