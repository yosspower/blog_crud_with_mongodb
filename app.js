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
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");

// Assuming you have your Express app initialized
// app.use(express.urlencoded({ extended: true })); // This line is needed if you're parsing form data

// Add method override middleware
app.use(methodOverride("_method"));
const jwt = require("jsonwebtoken");
const secret_key = "enji122u3u31g12tf21f31";
Connect();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(log);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/profile", postRouter);

app.get("/", (req, res) => {
  res.json({ message: "welcome user go to /login" });
});
app.get("/posts", allPosts);

app.use(notFound);
app.use(errHandler);
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
