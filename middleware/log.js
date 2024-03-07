const fs = require("fs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const secret_key = "enji122u3u31g12tf21f31";
function log(req, res, next) {
  const token = req.session.token;
  let logged = `- \`${req.url}\` - \`3abir sabil(non-Valid Token)\` \n `;
  if (!token) {
    logged = ` - \`${req.url}\` || **${req.method}**||${new Date().toISOString().split(".")[0]}||(User :\`Guest\`)\n`;
  } else {
    jwt.verify(token, secret_key, (err, data) => {
      logged = ` - \`${req.url}\` || **${req.method}**||${new Date().toISOString().split(".")[0]}||(User : \`${data.userId}\`)\n`;
    });
  }
  fs.appendFileSync("./log.md", logged);
  next();
}
module.exports = log;
