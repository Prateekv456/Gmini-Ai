import React from "react";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className={`navbar ${darkMode ? "dark-navbar" : ""}`}>
      <h1>Chat Application</h1>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
};

export default Navbar;
