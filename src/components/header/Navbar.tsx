import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { useSelector } from "react-redux";
import { selectCartCount } from "../../store/cartSlice";
import "./Navbar.css";
import { getSearchRecipes } from "../../utils/recipes";
import { logoutUser } from "../../utils/login";

const Navbar: React.FC = () => {
  const { user, setUser, setToken } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const cartCount = useSelector(selectCartCount);
  const navigate = useNavigate();

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const handleSearchClick = (result: any) => {
    setSearchResults([]);
    setSearchTerm("");
    navigate(`/recipe/${result.id}`);
  };

  const logOut = async () => {
    try {
      const res = await logoutUser();
      if (res) {
        setUser({});
        setToken("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(async () => {
      if (value) {
        const res = await getSearchRecipes(value);
        if (res?.recipes?.length) {
          setSearchResults(res.recipes);
        } else {
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    }, 500);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <nav className="custom-navbar navbar navbar-expand-lg navbar-light">
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
            <div
              className="search-container d-flex align-items-center ms-3"
              ref={searchContainerRef}
            >
              <span className="search-icon">
                <i className="material-icons-round">search</i>
              </span>
              <input
                ref={searchInputRef}
                type="text"
                className="search-input"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search Recipes"
              />
              {searchTerm && searchResults.length > 0 && (
                <div className="search-results">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      className="search-result-item"
                      onClick={() => handleSearchClick(result)}
                    >
                      <img
                        src={result?.image}
                        className="search-result-img"
                        alt={result?.name || "Recipe"}
                      />
                      <span className="search-result-text">
                        {result?.name || "-"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="cart-container ms-3">
              <NavLink to="/cart" className="cart-icon" aria-label="Cart">
                <i className="material-icons-round">shopping_cart</i>
                {cartCount > 0 && (
                  <span className="cart-count">{cartCount}</span>
                )}
              </NavLink>
            </div>
            {user?.email ? (
              <div className="d-flex align-items-center ms-3">
                <h6 className="mb-0">{user.firstName}</h6>
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
