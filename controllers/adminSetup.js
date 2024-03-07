const bcrypt = require("bcrypt");
const User = require("../models/User");
async function turnToAdminPage(req, res) {
  res.send(`
    <h2>Login</h2>
    <form action="/profile/turn-admin" method="POST">
        <label for="code">Code:</label>
        <input type="text" name="secret_code" required>
        <input type="submit" value="Login">
    </form>
    `);
}
async function turnToAdmin(req, res) {
  const { secret_code } = req.body;
  if (secret_code == "1234") {
    User.findOneAndUpdate({ _id: req.userId }, { $set: { role: "admin" } })
      .then((user) => {
        res.json({ message: `You are now admin! mr: ${user.name}` });
      })
      .catch((err) => {
        console.log(err);
        res.json({ message: "Internet error!" });
      });
  } else {
    res.json({ message: "Wrong code!" });
  }
}
module.exports = { turnToAdmin, turnToAdminPage };
