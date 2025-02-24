import React from "react";

const Sidebar = ({ darkMode }) => {
  return (
    <div className={`sidebar ${darkMode ? "dark-sidebar" : ""}`}>
      <ul>
        <li>New Chat</li>
        <li>History</li>
        <li>Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;
