const Post = require("../models/Post");
const User = require("../models/User");

async function isAllowed(req, res, next) {
  const userId = req.userId;
  try {
    const post = await Post.findOne({ _id: req.params.id });
    if (post.userId == req.userId || req.userRole == "admin") {
      req.postId = post._id;
      next();
    } else {
      return res
        .status(403)
        .json({ msg: "You are not allowed to do this action" });
    }
  } catch (err) {
    return res.status(403).json({ msg: "Post does not exist" });
  }
}

module.exports = isAllowed;
