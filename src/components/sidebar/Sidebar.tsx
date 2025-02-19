import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const menuItems = [
    "Pizza",
    "Cookies",
    "Dessert",
    "Pasta",
    "Chicken",
    "Salad",
    "Biryani",
  ];

  const handleMenuItemClick = (item: string) => {
    toggleSidebar();
    navigate(`/home?tag=${item.toLowerCase()}`);
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : ""}`} aria-hidden={!isOpen}>
        <div className="sidebar-header">
          <h2 className="menu-text">Menu Items</h2>
          <button className="close-btn" onClick={toggleSidebar}>
            X
          </button>
        </div>

        <ul>
          {menuItems.map((item, index) => (
            <li key={index} onClick={() => handleMenuItemClick(item)}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;
