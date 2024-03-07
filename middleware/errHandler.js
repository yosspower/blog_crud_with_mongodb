function errHandler(err, req, res, next) {
  console.log(err);
  res.json({ message: "Server error" });
}
module.exports = errHandler;
