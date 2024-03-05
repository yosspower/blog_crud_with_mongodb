const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const secret_key = "enji122u3u31g12tf21f31";

async function getUser(userId) {
  const user = await User.findOne({ _id: userId });
  return user;
}
async function allPosts(req, res) {
  const posts = await Post.find();

  return res.json({ posts: posts });
}
async function show(req, res) {
  Post.find({ userId: req.userId })
    .then((posts) => {
      if (posts.length <= 0) {
        return res.status(404).json({ message: "No posts posted yet!!." });
      }

      res.json({ posts: posts });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
}
async function profile(req, res) {
  try {
    const user = await getUser(req.userId);
    res.json({ message: `welcome ${user.name} role : ${user.role}` });
  } catch {
    res.json({ error: "server Error !" });
  }
}
async function addPage(req, res) {
  res.send(`
<h2 style="text-align: center; margin-bottom: 20px;">Add Post</h2>
<form action="/profile/posts" method="POST" style="max-width: 400px; margin: 0 auto;">
    <label for="title" style="display: block; margin-bottom: 10px;">Title:</label>
    <input type="text" id="title" name="title" required style="width: 100%; padding: 8px; margin-bottom: 10px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px;"><br>

    <label for="content" style="display: block; margin-bottom: 10px;">Content:</label>
    <textarea id="content" name="content" rows="4" required style="width: 100%; padding: 8px; margin-bottom: 10px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px;"></textarea><br>

    <input type="submit" value="Submit" style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; width: 100%;"><br>
</form>`);
}
async function add(req, res) {
  try {
    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      userId: req.userId,
    });

    newPost
      .save()
      .then((user) => {
        res.redirect("/profile/posts");
      })
      .catch((err) => {
        res.status(401).json({ message: err.message });
      });
  } catch (err) {
    res.status(401).json({ msg: err.message });
  }
}

async function update(req, res) {
  const { title, content } = req.body;
  Post.findOneAndUpdate(
    { _id: req.postId },
    {
      $set: {
        title: title,
        content: content,
      },
    },
  )
    .then((post) => {
      return res.json({ message: "post Updated! " + post._id });
    })
    .catch((err) => {
      return res.status(400).json({ error: "Cannot Update this  post!" });
    });
}

async function remove(req, res) {
  Post.findOneAndDelete({ _id: req.postId })
    .then((post) => {
      return res.json({ message: "post deleted! id: " + post._id });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}

module.exports = { show, add, update, remove, profile, allPosts, addPage };
