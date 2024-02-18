const express = require("express");
const app = express();
const port = 3000;

const posts = require("./routes/postRoutes");
app.use(express.json());

app.use("/posts", posts);

app.get("/", (req, res) => {
  res.send("welcome user go to /posts");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
