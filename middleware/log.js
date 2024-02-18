const fs = require("fs");
function log(req, res, next) {
  const log = ` - \`/posts${req.url}\` || **${req.method}**||${new Date().toISOString().split(".")[0]}\n`;
  fs.appendFileSync("./log.md", log);
  next();
}
module.exports = log;
