import React from "react";
import { Link, useNavigate } from "react-router-dom";
import authHelper from "../auth/auth-helper";

export default function Navbar() {
  const navigate = useNavigate();
  const isAuth = authHelper.isAuthenticated();

  const signout = () => {
    authHelper.clearJWT(() => navigate("/"));
  };

  return (
    <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px", background: "#1a365d" }}>
      <Link to="/" style={{ color: "#fff", fontSize: 20, fontWeight: "bold", textDecoration: "none" }}>InkWell</Link>
      <div style={{ display: "flex", gap: 16 }}>
        <Link to="/" style={{ color: "#fff" }}>Home</Link>
        {isAuth ? (
          <>
            <Link to="/post/new" style={{ color: "#fff" }}>New Post</Link>
            <Link to="/profile" style={{ color: "#fff" }}>MyProfile</Link>
            <span style={{ color: "#cbd5e0" }}>{isAuth.user && isAuth.user.name}</span>
            <button onClick={signout} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}>Sign Out</button>
          </>
        ) : (
          <>
            <Link to="/signin" style={{ color: "#fff" }}>Sign In</Link>
            <Link to="/signup" style={{ color: "#fff" }}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}