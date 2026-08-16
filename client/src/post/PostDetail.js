import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { read, remove } from "./api-post";
import authHelper from "../auth/auth-helper";

export default function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const isAuth = authHelper.isAuthenticated();

  useEffect(() => {
    read(postId).then((data) => {
      if (data && !data.error) setPost(data);
    });
  }, [postId]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
    const data = await remove(postId, isAuth.token);
    if (data && !data.error) {
      navigate("/");
    }
  };

  if (!post) return <p style={{ textAlign: "center", marginTop: 40 }}>Loading...</p>;

  const isOwner = isAuth && post.author && isAuth.user.id === post.author._id;

  return (
    <div style={{ maxWidth: 700, margin: "30px auto", padding: "0 16px" }}>
      <Link to="/">&larr; Back to all posts</Link>
      <h1 style={{ marginTop: 16 }}>{post.title}</h1>
      <p style={{ color: "#777", fontSize: 13 }}>
        By {post.author && post.author.name} | {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <p style={{ marginTop: 20, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{post.content}</p>

      {isOwner && (
        <div style={{ marginTop: 24 }}>
          <Link to={`/post/edit/${post._id}`}>
            <button style={{ padding: "8px 16px", marginRight: 10 }}>Edit</button>
          </Link>
          <button onClick={handleDelete} style={{ padding: "8px 16px" }}>Delete</button>
        </div>
      )}
    </div>
  );
}