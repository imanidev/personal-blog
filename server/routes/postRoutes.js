const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");

router.get("/", postsController.getPosts);

router.post("/", postsController.createPost);

router.get("/:id", postsController.getPost);

router.put("/:id", postsController.updatePost);

router.delete("/:id", postsController.deletePost);

router.delete("/", postsController.deleteAllPosts);

module.exports = router;
