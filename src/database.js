const mongoose = require("mongoose");

const Connect = () =>
  mongoose
    .connect("mongodb://127.0.0.1:27017/blogapp")
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Connected Failed to MongoDB");
    });
module.exports = Connect;
