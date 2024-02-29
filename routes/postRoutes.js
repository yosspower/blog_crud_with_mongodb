// this is a simple express js project using json for crud application

const express = require("express");
const Router = express.Router();
const fs = require("fs");
const { show, add, update, remove ,profile} = require("../controllers/postController");
const errHandler = require("../middleware/errHandler.js");
const notFound = require("../middleware/pageNotFound.js");

const ensureToken = require("../middleware/ensureToken");



Router.use(ensureToken)



Router.get("/",profile);

Router.route("/posts").get(show).post(add);

Router.route("/posts/:id").put(update).delete(remove);

Router.use(notFound);

Router.use(errHandler);

module.exports = Router;
