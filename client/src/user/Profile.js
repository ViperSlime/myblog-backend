import React, { useState, useEffect } from "react";
import authHelper from "../auth/auth-helper";

export default function Profile() {
  const isAuth = authHelper.isAuthenticated();

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: "0 16px" }}>
      <h2>My Profile</h2>
      <p><strong>Name:</strong> {isAuth.user && isAuth.user.name}</p>
      <p><strong>Email:</strong> {isAuth.user && isAuth.user.email}</p>
    </div>
  );
}