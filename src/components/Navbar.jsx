import { useState } from "react";

export const Navbar = ({ currentTab, setCurrentTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>ToDo App</h2>
        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          ☰
        </button>
      </div>

      <div className={`navbar-links ${isOpen ? "open" : ""}`}>
        <button
          className={`nav-btn ${currentTab === "tasks" ? "active" : ""}`}
          onClick={() => handleTabChange("tasks")}
        >
          Tasks
        </button>
        <button
          className={`nav-btn ${currentTab === "categories" ? "active" : ""}`}
          onClick={() => handleTabChange("categories")}
        >
          Categories
        </button>
        <button
          className={`nav-btn ${currentTab === "tags" ? "active" : ""}`}
          onClick={() => handleTabChange("tags")}
        >
          Tags
        </button>
      </div>
    </nav>
  );
};
