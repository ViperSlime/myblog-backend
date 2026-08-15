const express = require("express");
const router = express.Router();
const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require("../controllers/post.controller");
const { requireSignin } = require("../middleware/auth.middleware");

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", requireSignin, createPost);
router.put("/:id", requireSignin, updatePost);
router.delete("/:id", requireSignin, deletePost);

module.exports = router;