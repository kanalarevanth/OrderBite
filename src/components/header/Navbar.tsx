import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import "./Navbar.css";
import { useAuth } from "../../context/AuthContext";

const Navbar: React.FC = () => {
  const { user, logOut } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            aria-label="Toggle navigation"
            onClick={toggleSidebar}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <NavLink className="navbar-brand" to="/">
            Recipes
          </NavLink>
          {user?.email ? (
            <div className="d-flex align-items-center">
              <h6 className="mb-0">{user.email}</h6>
              <button
                className="btn btn-link ms-2 text-dark logout-btn"
                onClick={logOut}
                aria-label="Logout"
              >
                <i className="material-icons-round">logout</i>
              </button>
            </div>
          ) : (
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
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
