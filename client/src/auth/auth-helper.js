const authHelper = {
  isAuthenticated() {
    if (typeof window === "undefined") return false;
    const jwt = localStorage.getItem("jwt");
    return jwt ? JSON.parse(jwt) : false;
  },
  authenticate(jwt, cb) {
    if (typeof window !== "undefined") {
      localStorage.setItem("jwt", JSON.stringify(jwt));
    }
    cb();
  },
  clearJWT(cb) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt");
    }
    cb();
    fetch("/api/auth/signout", { method: "GET" });
  },
};

export default authHelper;