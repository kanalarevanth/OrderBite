import React from "react";
import "./Sidebar.css";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    "Pizza",
    "Cookies",
    "Dessert",
    "Pasta",
    "Chicken",
    "Salad",
    "Biryani",
  ];

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
            <li key={index} onClick={toggleSidebar}>
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
