const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts");
const authMiddleware = require("../middlewares/auth");
const Post = require("../models/post");

// Get all posts
router.get("/", postController.getPosts);

// Get a specific post by ID
router.get("/:id", getPost, postController.getPost);

// Create a new post
router.post("/", authMiddleware, postController.createPost);

// Update an existing post
router.patch("/:id", authMiddleware, getPost, postController.updatePost);

// Delete a post
router.delete("/:id", authMiddleware, getPost, postController.deletePost);

// Middleware function to get a specific post by ID
async function getPost(req, res, next) {
  let post;
  try {
    post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: "Cannot find post" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.post = post;
  next();
}

module.exports = router;
