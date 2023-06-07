const Post = require("../models/Post");

//get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//create a post
exports.createPost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get a post by id
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update a post by id
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (req.body.title != null) {
      post.title = req.body.title;
    }

    if (req.body.post != null) {
      post.post = req.body.post;
    }

    if (req.body.author != null) {
      post.author = req.body.author;
    }

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete a post by id
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await post.remove();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete all posts
exports.deleteAllPosts = async (req, res) => {
  try {
    const result = await Post.deleteMany({});
    if (result.deletedCount === 0) {
      return res.status(200).json({ message: "No posts to delete" });
    }
    res.json({ message: "All posts deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
