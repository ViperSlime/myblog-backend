import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { create, read, update } from "./api-post";
import authHelper from "../auth/auth-helper";

export default function NewEditPost() {
  const { postId } = useParams();
  const isEdit = Boolean(postId);
  const [values, setValues] = useState({ title: "", content: "" });
  const navigate = useNavigate();
  const isAuth = authHelper.isAuthenticated();

  useEffect(() => {
    if (isEdit) {
      read(postId).then((data) => {
        if (data && !data.error) setValues({ title: data.title, content: data.content });
      });
    }
  }, [postId, isEdit]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = async () => {
    const post = { title: values.title, content: values.content };
    const data = isEdit
      ? await update(postId, post, isAuth.token)
      : await create(post, isAuth.token);

    if (data && !data.error) {
      navigate(isEdit ? `/post/${postId}` : `/post/${data._id}`);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: "0 16px" }}>
      <h2>{isEdit ? "Edit Post" : "New Post"}</h2>
      <div style={{ marginBottom: 12 }}>
        <label>Title</label>
        <input style={{ width: "100%", padding: 8 }} value={values.title} onChange={handleChange("title")} />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Content</label>
        <textarea rows={8} style={{ width: "100%", padding: 8 }} value={values.content} onChange={handleChange("content")} />
      </div>
      <button onClick={clickSubmit} style={{ padding: "10px 20px" }}>
        {isEdit ? "Save Changes" : "Publish Post"}
      </button>
    </div>
  );
}