const posts = require("../src/posts.json");
const fs = require("fs");
function getDate() {
  return (
    new Date().getFullYear() +
    "-" +
    (new Date().getMonth() + 1) +
    "-" +
    new Date().getDate() +
    "/" +
    new Date().getHours() +
    ":" +
    new Date().getMinutes()
  );
}
function getAllPosts() {
  let output = "<h2>Blog Posts</h2>";
  posts.forEach((post) => {
    output += `<p>${post.id} - <strong>Post Title :</strong> ${post.title} <strong>Post Author</strong> ${post.author}</</p>\n`;
  });
  return output;
}

function createPost(newPost) {
  !newPost.id
    ? (newPost = { id: posts.length + 1, ...newPost })
    : (newPost.id = posts.length + 1);

  newPost.created_at = getDate();

  posts.push(newPost);

  try {
    fs.writeFileSync("./src/posts.json", JSON.stringify(posts, null, 4));
    console.log("New Post Created");
  } catch (err) {
    console.log("Error Creating New Post:" + err);
  }
}

function updatePost(newPostData, id) {
  // id : id from request params
  //newPostData updated  data object from body parser
  let postIndex = posts.findIndex((p) => p.id == id);
  if (postIndex > -1) {
    newPostData.id = parseInt(id);
    newPostData.created_at = posts[postIndex].created_at;
    newPostData.updated_at = getDate();
    posts.splice(postIndex, 1, newPostData);
    fs.writeFileSync("./src/posts.json", JSON.stringify(posts, null, 3));
    console.log("updated succesfully");
    return true;
  } else {
    console.log(`No post with the id ${id}`);
    return false;
  }
}
function deletePost(id) {
  let postIndex = posts.findIndex((p) => p.id == id);
  if (postIndex > -1) {
    posts.splice(postIndex, 1);
    posts.forEach((post, indx) => {
      posts[indx].id = indx + 1;
    });

    fs.writeFileSync("./src/posts.json", JSON.stringify(posts, null, 3));
    console.log("deleted succesfully postId : ", id);
    return true;
  } else {
    console.log("postId :", id, " not found");

    return false;
  }
}

module.exports = { getAllPosts, createPost, updatePost, deletePost };
