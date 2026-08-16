import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { create } from "./api-user";

export default function Signup() {
  const [values, setValues] = useState({ name: "", email: "", password: "", error: "", open: false });
  const navigate = useNavigate();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = async () => {
    const user = { name: values.name || undefined, email: values.email || undefined, password: values.password || undefined };
    const data = await create(user);
    if (data && data.message && data.message.includes("registered")) {
      setValues({ ...values, error: "", open: true });
    } else {
      setValues({ ...values, error: (data && data.message) || "Something went wrong" });
    }
  };

  if (values.open) {
    return (
      <div style={{ maxWidth: 400, margin: "60px auto", textAlign: "center" }}>
        <h2>New account created!</h2>
        <p>You can now <Link to="/signin">Sign In</Link>.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 400, margin: "60px auto" }}>
      <h2>Sign Up</h2>
      <div style={{ marginBottom: 12 }}>
        <label>Name</label>
        <input style={{ width: "100%", padding: 8 }} value={values.name} onChange={handleChange("name")} />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Email</label>
        <input style={{ width: "100%", padding: 8 }} value={values.email} onChange={handleChange("email")} />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Password</label>
        <input type="password" style={{ width: "100%", padding: 8 }} value={values.password} onChange={handleChange("password")} />
      </div>
      {values.error && <p style={{ color: "red" }}>{values.error}</p>}
      <button onClick={clickSubmit} style={{ padding: "10px 20px" }}>Create Account</button>
      <p style={{ marginTop: 16 }}>Already have an account? <Link to="/signin">Sign In</Link></p>
    </div>
  );
}