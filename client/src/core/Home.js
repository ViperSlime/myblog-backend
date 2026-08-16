import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { list } from "../post/api-post";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    list().then((data) => {
      if (data && !data.error) setPosts(data);
    });
  }, []);

  return (
    <div style={{ maxWidth: 700, margin: "30px auto", padding: "0 16px" }}>
      <h2>Latest Posts</h2>
      {posts.length === 0 && <p>No posts yet.</p>}
      {posts.map((post) => (
        <div key={post._id} style={{ border: "1px solid #ddd", borderRadius: 6, padding: 16, marginBottom: 16 }}>
          <h3><Link to={`/post/${post._id}`}>{post.title}</Link></h3>
          <p style={{ color: "#777", fontSize: 13 }}>
            By {post.author && post.author.name} | {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
      <p style={{ textAlign: "center", marginTop: 40, color: "#aaa", fontSize: 12 }}>
  InkWell — a COMP229 project by Slyme
</p>
    </div>
  );
}