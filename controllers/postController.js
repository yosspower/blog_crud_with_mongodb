const {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
} = require("../models/post");

function show(req, res) {
  res.send(getAllPosts());
}
function add(req, res) {
  let post = req.body;
  if (post.title && post.content && post.author) {
    createPost(req.body);
    res.send("new Post Added succesfully");
  } else {
    res.send(
      "make sure you sent all the informations  (title , content and author) ",
    );
  }
}
function update(req, res) {
  if (updatePost(req.body, req.params.id)) {
    res.send("post updated succesfully");
  } else {
    res.send("this post does not exists");
  }
}

function remove(req, res) {
  if (deletePost(req.params.id)) {
    res.send("post deleted succesfully");
  } else {
    res.send("this post does not exists");
  }
}

module.exports = { show, add, update, remove };
