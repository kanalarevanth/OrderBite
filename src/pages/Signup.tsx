import React, { useState } from "react";
import "./Signup.css";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import { addUser } from "../utils/signup";

const Signup: React.FC = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{8,}$/;

    if (!passwordRegex.test(userData.password)) {
      setPasswordError(
        "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character."
      );
      return;
    } else {
      setPasswordError("");
    }

    setLoading(true);
    try {
      const res = await addUser(userData);
      if (res && res?.status === 409) {
        setError("User Account already exists. Please Login");
      } else if (res) {
        navigate("/login");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Signup failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container signup-container-card">
      <div className="p-4 shadow-lg signIn-card">
        <h2 className="text-center mb-4">Create an account</h2>
        <form onSubmit={handleLogin}>
          <div className="form-row mb-3">
            <div className="form-group col-md-6">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                id="firstname"
                className="form-control"
                value={userData.firstName}
                onChange={(e) =>
                  setUserData({ ...userData, firstName: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                id="lastname"
                className="form-control"
                value={userData.lastName}
                onChange={(e) =>
                  setUserData({ ...userData, lastName: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
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
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              required
              placeholder="Enter your password"
            />
            {passwordError && (
              <div className="text-danger mt-2">{passwordError}</div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block mt-3"
            disabled={
              !userData.firstName ||
              !userData.email ||
              !userData.password ||
              loading
            }
          >
            Sign Up
          </button>
        </form>
        {error && <div className="text-danger mt-3 text-center">{error}</div>}
        <p className="mt-3 text-center">
          Already have an account? <NavLink to="/login">Login</NavLink>
        </p>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default Signup;
