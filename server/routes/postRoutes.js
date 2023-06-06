const express = require("express")
const router = express.Router()
const Post = require("../models/Post")

const currentDate = new Date()
const formattedDate = currentDate.toLocaleDateString("en-US", {
  month: "2-digit",
  day: "2-digit",
  year: "numeric",
})

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
    res.json(posts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get a single post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }
    res.json(post)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create a post
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    post: req.body.content,
    author: req.body.author,
    createdAt: formattedDate,
    updatedAt: formattedDate,
  })

  try {
    const newPost = await post.save()
    res.status(201).json(newPost)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update a post by ID
router.patch("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }

    if (req.body.title != null) {
      post.title = req.body.title
    }

    if (req.body.post != null) {
      post.post = req.body.post
    }

    if (req.body.author != null) {
      post.author = req.body.author
    }

    if (req.body.createdAt != null) {
      post.createdAt = req.body.createdAt
    }

    if (req.body.updatedAt != null) {
      post.updatedAt = req.body.updatedAt
    }

    const updatedPost = await post.save()
    res.json(updatedPost)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete a post by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id)
    res.json({ message: "Post deleted", deletedPost })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete multiple posts
router.delete("/", async (req, res) => {
  try {
    const deletedPosts = await Post.deleteMany({ _id: { $in: req.body.ids } })
    res.json({ message: "Posts deleted", deletedPosts })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router
