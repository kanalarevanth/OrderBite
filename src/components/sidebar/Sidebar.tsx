import React from "react";
import "./Sidebar.css";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    "Pizza",
    "Stir-fry",
    "Cookies",
    "Dessert",
    "Pasta",
    "Chicken",
    "Salad",
    "Biryani",
  ];
  return (
    <>
      <div
        className={`sidebar ${isOpen ? "open" : ""}`}
        onClick={toggleSidebar}
      >
        <div className="sidebar-header">
          {/* <img src="logo.png" alt="Logo" /> */}
          <h2>Menu Items</h2>
        </div>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {isOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
    </>
  );
};

export default Sidebar;
