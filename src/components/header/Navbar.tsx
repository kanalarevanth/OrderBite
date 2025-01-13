import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import Sidebar from "../sidebar/Sidebar";

const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleSidebar}
          >
            <span
              className={`navbar-toggler-icon ${
                isSidebarOpen ? "close-icon" : ""
              }`}
            ></span>
          </button>

          <NavLink className="navbar-brand" to="/">
            Recipes
          </NavLink>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                  }
                  to="/login"
                >
                  Sign In
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
