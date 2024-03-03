const express = require("express");
const loginRouter = require("./routes/loginRoutes");
const registerRouter = require("./routes/registerRoutes");
const postRouter = require("./routes/postRoutes");
const { allPosts } = require("./controllers/postController.js");
const Connect = require("./src/database");
const log = require("./middleware/log.js");
const app = express();
const port = 3000;
const errHandler = require("./middleware/errHandler.js");
const notFound = require("./middleware/pageNotFound.js");

const jwt = require("jsonwebtoken");
const secret_key = "enji122u3u31g12tf21f31";
Connect();
app.use(express.json());
app.use(log);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/profile", postRouter);

app.get("/", (req, res) => {
  res.send("welcome user go to /login");
});
app.get("/posts", allPosts);

app.use(notFound);
app.use(errHandler);
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
