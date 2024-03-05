function errHandler(err, req, res, next) {
  console.log("Error handler called:", err.message);
  res.json({message : err.message || "Server error"});
}
module.exports = errHandler;
