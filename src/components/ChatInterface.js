import React, { useState, useRef, useEffect } from "react";
import { getChatResponse } from "../api";
import Sidebar from "./Sidebar";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 100) + "px";
    }
  }, [input]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setIsTyping(true);

    const botReply = await getChatResponse(input);
    let typedMessage = "";

    for (let i = 0; i < botReply.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 30));
      typedMessage += botReply[i];

      setMessages((prev) => {
        const updatedMessages = [...prev];

        if (updatedMessages.length > 0 && updatedMessages[updatedMessages.length - 1].sender === "bot") {
          updatedMessages[updatedMessages.length - 1].text = typedMessage;
        } else {
          updatedMessages.push({ text: typedMessage, sender: "bot" });
        }

        return updatedMessages;
      });
    }

    setIsTyping(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents new line in textarea
      handleSend();
    }
  };

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      {/* Sidebar */}
      <Sidebar darkMode={darkMode} />


      {/* Dark Mode Toggle Button */}
      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Centered Chat Container */}
      <div className="chat-container">
        <div className="chat-box">
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {isTyping && <div className="messagetyping">Typing...</div>}
            <div ref={messagesEndRef} />
          </div>

          {/* Flexible & Centered Input Box */}
          <div className="input-container">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              rows="1"
            />
            <button onClick={handleSend} disabled={!input.trim()}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
