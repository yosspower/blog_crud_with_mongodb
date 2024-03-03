// this is a simple express js project using json for crud application

const express = require("express");
const Router = express.Router();
const fs = require("fs");
const {
  show,
  add,
  update,
  remove,
  profile,
} = require("../controllers/postController");

const ensureToken = require("../middleware/ensureToken");

Router.use(ensureToken);

Router.get("/", profile);

Router.route("/posts").get(show).post(add);

Router.route("/posts/:id").put(update).delete(remove);



module.exports = Router;
