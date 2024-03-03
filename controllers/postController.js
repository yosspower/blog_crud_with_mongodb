const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const secret_key = "enji122u3u31g12tf21f31";

async function getUser(email) {
  const user = await User.findOne({ email: email });
  return user;
}
async function allPosts(req, res) {
  const posts = await Post.find();
  const user = await getUser(req.userEmail);
  let output = "<h1>ALL POSTS</h1>\n";
  posts.forEach((post) => {
    output += `<p> <h3> ${post.title} </h3> <strong> content of post :   </strong>${post.content}</p> \n <strong>User :</strong>${user.name} <hr>`;
  });

  return res.send(output);
}
async function show(req, res) {
  const user = await getUser(req.userEmail);

  Post.find({ userId: user._id })
    .then((posts) => {
      if (posts.length <= 0) {
        return res.status(404).send("No posts posted yet!!.");
      }
      let output = "<h1>YOUR POSTS</h1>\n";

      posts.forEach((post, indx) => {
        output += `<p> <h3> ${post.title} </h3> <strong> content of post :   </strong>${post.content}</p> \n <strong>User :</strong>${user.email} <hr>`;
      });
      res.send(output);
    })
    .catch((err) => {
      res.send(err.message);
    });
}
async function profile(req, res) {
  try {
    const user = await getUser(req.userEmail);
    res.send(`welcome ${user.name} role : ${user.role}`);
  } catch {
    res.send("server Error !");
  }
}
async function add(req, res) {
  try {
    const user = await getUser(req.userEmail);

    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      userId: user._id,
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
  const { id } = req.params;
  const { title, content, role } = req.body;
  const user = await getUser(req.userEmail);

  if (user.role == "admin") {
    Post.findOneAndUpdate(
      { _id: id },
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
        return res.status(400).send(err.message);
      });
  } else {
    Post.findOneAndUpdate(
      { _id: id, userId: user._id },
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
}

async function remove(req, res) {
  const { id } = req.params;
  const user = await getUser(req.userEmail);
  if (user.role == "admin") {
    Post.findOneAndDelete(
      { _id: id },
      {
        $set: {
          title: title,
          content: content,
        },
      },
    )
      .then((post) => {
        if (post) {
          return res.send("post deleted! id: " + post._id);
        }

        return res.status(400).send("Cannot delete this  post!");
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
  } else {
    Post.findOneAndDelete({ _id: id, userId: user._id })
      .then((post) => {
        if (post) {
          return res.send("post deleted! id: " + post._id);
        }

        return res.status(400).send("Cannot delete this  post!");
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
  }
}

module.exports = { show, add, update, remove, profile, allPosts };
