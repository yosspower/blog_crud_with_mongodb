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
  addPage,
} = require("../controllers/postController");

const ensureToken = require("../middleware/ensureToken");
const isAllowed = require("../middleware/isAllowed");

Router.use(ensureToken);

Router.get("/", profile);

Router.get("/add-post", addPage);

Router.route("/posts").get(show).post(add);

Router.route("/posts/:id").put(isAllowed, update).delete(isAllowed, remove);

module.exports = Router;
