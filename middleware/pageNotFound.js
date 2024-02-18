function notFound(req, res) {
  res.status(404).send("page does Not exist");
}
module.exports = notFound;
