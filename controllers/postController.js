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
  let output = "<h1>ALL POSTS</h1>\n";
  posts.forEach((post) => {
    output += `<p> <h3> ${post.title} </h3> <strong> content of post :   </strong>${post.content}</p> \n  <hr>`;
  });

  return res.send(output);
}
async function show(req, res) {
  Post.find({ userId: req.userId })
    .then((posts) => {
      if (posts.length <= 0) {
        return res.status(404).send("No posts posted yet!!.");
      }
      let output = "<h1>YOUR POSTS</h1>\n";

      posts.forEach((post) => {
        output += `<p> <h3> ${post.title} </h3> <strong> content of post :   </strong>${post.content}</p> \n  <hr>`;
      });
      res.send(output);
    })
    .catch((err) => {
      res.send(err.message);
    });
}
async function profile(req, res) {
  try {
    const user = await getUser(req.userId);
    res.send(`welcome ${user.name} role : ${user.role}`);
  } catch {
    res.send("server Error !");
  }
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
        res.send("Post added succesfully");
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
      return res.send("post Updated! " + post._id);
    })
    .catch((err) => {
      return res.status(400).send("Cannot Update this  post!");
    });
}

async function remove(req, res) {
  Post.findOneAndDelete({ _id: req.postId })
    .then((post) => {
      return res.send("post deleted! id: " + post._id);
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
}

module.exports = { show, add, update, remove, profile, allPosts };
