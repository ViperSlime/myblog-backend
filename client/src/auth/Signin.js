import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin } from "./api-auth";
import authHelper from "./auth-helper";

export default function Signin() {
  const [values, setValues] = useState({ email: "", password: "", error: "" });
  const navigate = useNavigate();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = async () => {
    const user = { email: values.email || undefined, password: values.password || undefined };
    const data = await signin(user);
    if (data && data.token) {
      authHelper.authenticate(data, () => {
        navigate("/");
      });
    } else {
      setValues({ ...values, error: (data && data.message) || "Sign in failed" });
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "60px auto" }}>
      <h2>Sign In</h2>
      <div style={{ marginBottom: 12 }}>
        <label>Email</label>
        <input style={{ width: "100%", padding: 8 }} value={values.email} onChange={handleChange("email")} />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Password</label>
        <input type="password" style={{ width: "100%", padding: 8 }} value={values.password} onChange={handleChange("password")} />
      </div>
      {values.error && <p style={{ color: "red" }}>{values.error}</p>}
      <button onClick={clickSubmit} style={{ padding: "10px 20px" }}>Sign In</button>
    </div>
  );
}