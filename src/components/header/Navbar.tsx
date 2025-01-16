import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import "./Navbar.css";
import { useAuth } from "../../context/AuthContext";
import { useSelector } from "react-redux";
import { selectCartCount } from "../../store/cartSlice";

const Navbar: React.FC = () => {
  const { user, logOut } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const cartCount = useSelector(selectCartCount);

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

          <div className="ms-auto d-flex align-items-center">
            <div className="cart-container">
              <NavLink to="/cart" className="cart-icon" aria-label="Cart">
                <i className="material-icons-round">shopping_cart</i>
                {cartCount > 0 && (
                  <span className="cart-count">{cartCount}</span>
                )}
              </NavLink>
            </div>

            {user?.email ? (
              <div className="d-flex align-items-center ms-3">
                <h6 className="mb-0">{user.email}</h6>
                <button
                  className="btn btn-link ms-2 text-dark logout-btn"
                  onClick={logOut}
                  aria-label="Logout"
                >
                  <i className="material-icons-round logout-icon">logout</i>
                </button>
              </div>
            ) : (
              <ul className="navbar-nav">
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
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
