// this is a simple express js project using json for crud application

const express = require("express");
const Router = express.Router();
const fs = require("fs");
const { show, add, update, remove } = require("../controllers/postController");
const errHandler = require("../middleware/errHandler.js");
const notFound = require("../middleware/pageNotFound.js");
const log = require("../middleware/log.js");

Router.use(log);
Router.route("/").get(show).post(add);

Router.route("/:id").put(update).delete(remove);

Router.use(notFound);

Router.use(errHandler);

module.exports = Router;
