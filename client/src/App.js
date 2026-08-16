import React from "react";
import Profile from "./user/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./core/Navbar";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./auth/Signin";
import PostDetail from "./post/PostDetail";
import NewEditPost from "./post/NewEditPost";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/signin" element={<Signin />} />
  <Route path="/post/new" element={<NewEditPost />} />
  <Route path="/post/edit/:postId" element={<NewEditPost />} />
  <Route path="/post/:postId" element={<PostDetail />} />
</Routes>
    </BrowserRouter>
  );
}

export default App;