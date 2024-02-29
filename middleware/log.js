const fs = require("fs");

const jwt = require("jsonwebtoken");
const secret_key = "enji122u3u31g12tf21f31";
function log(req, res, next) {
const authorization = req.headers[ "authorization" ];
let logged  = "- \`3abir sabil\`  \n";
if (!authorization) {
   logged = ` - \`${req.url}\` || **${req.method}**||${new Date().toISOString().split(".")[0]}||(User :\`Quest\`)\n`;
} else{


const tkn = authorization.split(' ')[1];
jwt.verify(tkn,secret_key,(err,user)=>{
if(!err){
  logged = ` - \`${req.url}\` || **${req.method}**||${new Date().toISOString().split(".")[0]}||(User : \`${user.email}\`)\n`;
}
})}
fs.appendFileSync("./log.md", logged);
next();
}
module.exports = log;
