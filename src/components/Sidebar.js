import React, { useState } from "react";

const Sidebar = ({ darkMode, chats, onNewChat, onSelectChat, onEditChatName, onDeleteChat }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEdit = (index, name) => {
    setEditingIndex(index);
    setEditText(name);
  };

  const handleSaveEdit = (index) => {
    if (editText.trim() === "") return;
    onEditChatName(index, editText);
    setEditingIndex(null);
  };

  return (
    <div className={`sidebar ${darkMode ? "dark-sidebar" : ""}`} style={styles.sidebar}>
      <h1>AI Interface</h1>

      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={onNewChat}>
          New Chat
        </button>

        <h2>Chat History</h2>
        <div style={styles.chatList}>
          {chats.map((chat, index) => (
            <div key={index} style={styles.chatItemContainer}>
              {editingIndex === index ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={() => handleSaveEdit(index)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveEdit(index)}
                  autoFocus
                  style={styles.editInput}
                />
              ) : (
                <button style={styles.chatItem} onClick={() => onSelectChat(index)}>
                  {chat.name}
                </button>
              )}
              <span onClick={() => handleEdit(index, chat.name)} style={styles.editIcon}>✏️</span>
              <span onClick={() => onDeleteChat(index)} style={styles.deleteIcon}>🗑️</span>
            </div>
          ))}
        </div>

        <button style={styles.button}>Settings</button>
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    padding: "20px",
    width: "250px",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
    marginTop: "20px",
  },
  button: {
    backgroundColor: "#111",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%",
  },
  chatList: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginTop: "10px",
    gap: "5px",
  },
  chatItemContainer: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  chatItem: {
    flex: 1,
    backgroundColor: "#222",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  editInput: {
    flex: 1,
    padding: "5px",
    borderRadius: "4px",
  },
  editIcon: { cursor: "pointer" },
  deleteIcon: { cursor: "pointer", marginLeft: "5px" },
};

export default Sidebar;
