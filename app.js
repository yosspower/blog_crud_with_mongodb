const express = require("express");
const loginRouter = require("./routes/loginRoutes");
const registerRouter = require("./routes/registerRoutes");
const profileRouter = require("./routes/profileRoutes.js");
const { allPosts } = require("./controllers/postController.js");
const Connect = require("./src/database");
const log = require("./middleware/log.js");
const app = express();
const port = 3000;
const errHandler = require("./middleware/errHandler.js");
const notFound = require("./middleware/pageNotFound.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const User = require("./models/User");
app.use(cookieParser());
//Configure Express Session
app.use(
  session({
    secret: "dsushdhiuhdeec", //this is a random string that will be used to sign the session id cookie.
    resave: false, //don't save back to the session if unmodified
    saveUninitialized: false, // don't create sessions for requests that do not provide a session id
  }),
);

const jwt = require("jsonwebtoken");
const secret_key = "enji122u3u31g12tf21f31";
Connect();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies (with some limitations)

app.use(express.json());
app.use(log);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/profile", profileRouter);

app.get("/", (req, res) => {
  res.json({ message: "welcome user go to /login" });
});

app.get("/posts", allPosts);
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect("/login");
  });
});

app.use(notFound);
app.use(errHandler);
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
