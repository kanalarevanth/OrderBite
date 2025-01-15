import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const loggedInUser = { email };
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    navigate("/");
  };

  useEffect(() => {
    if (user?.length) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="container login-container-card">
      <div className="p-4 shadow-lg signIn-card">
        <h2 className="text-center mb-4">Sign In</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block mt-3"
            disabled={!email || !password}
          >
            Login
          </button>
        </form>
        <p className="mt-3 text-center">
          Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
