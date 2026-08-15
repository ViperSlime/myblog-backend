const Post = require("../models/post.model");

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find().populate("author", "name email").sort({ createdAt: -1 });
  res.json(posts);
};

exports.getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id).populate("author", "name email");
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
};

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = new Post({ title, content, author: req.userId });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  if (post.author.toString() !== req.userId) return res.status(403).json({ message: "Not authorized to edit this post" });

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;
  await post.save();
  res.json(post);
};

exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  if (post.author.toString() !== req.userId) return res.status(403).json({ message: "Not authorized to delete this post" });

  await post.deleteOne();
  res.json({ message: "Post deleted" });
};