function errHandler(err, req, res, next) {
  console.log("Error handler called:", err.message);
  res.send(err.message || "Server error");
}
module.exports = errHandler;
