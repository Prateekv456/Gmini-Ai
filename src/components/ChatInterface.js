import React, { useState, useRef, useEffect } from "react";
import { getChatResponse } from "../api";
import Sidebar from "./Sidebar";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem("chatHistory")) || [];
    if (savedChats.length > 0) {
      setChats(savedChats);
      setMessages(savedChats[savedChats.length - 1]?.messages || []);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 100) + "px";
    }
  }, [input]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    const botReply = await getChatResponse(input);
    let typedMessage = "";

    for (let i = 0; i < botReply.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 30));
      typedMessage += botReply[i];

      setMessages((prev) => {
        const updatedMsgs = [...prev];
        if (updatedMsgs.length > 0 && updatedMsgs[updatedMsgs.length - 1].sender === "bot") {
          updatedMsgs[updatedMsgs.length - 1].text = typedMessage;
        } else {
          updatedMsgs.push({ text: typedMessage, sender: "bot" });
        }
        return updatedMsgs;
      });
    }

    setIsTyping(false);

    setChats((prevChats) => {
      if (prevChats.length === 0) return [{ name: input.substring(0, 20) + "...", messages: updatedMessages.concat({ text: typedMessage, sender: "bot" }) }];
      
      const updatedChats = [...prevChats];
      if (updatedChats[updatedChats.length - 1]?.messages.length === 0) {
        updatedChats[updatedChats.length - 1].name = input.length > 20 ? input.substring(0, 20) + "..." : input;
      }
      updatedChats[updatedChats.length - 1].messages = updatedMessages.concat({ text: typedMessage, sender: "bot" });
      return updatedChats;
    });
  };

  const handleNewChat = () => {
    const newChat = { name: "New Chat", messages: [] };
    setChats([...chats, newChat]);
    setMessages([]);
    setSelectedChat(chats.length); 
  };

  const handleSelectChat = (index) => {
    setSelectedChat(index);
    setMessages(chats[index]?.messages || []);
  };

  const handleEditChatName = (index, newName) => {
    setChats((prevChats) => {
      const updatedChats = [...prevChats];
      updatedChats[index].name = newName;
      return updatedChats;
    });
  };

  const handleDeleteChat = (index) => {
    setChats((prevChats) => {
      if (!prevChats || prevChats.length === 0) return [];
      return prevChats.filter((_, i) => i !== index);
    });

    if (selectedChat === index) {
      setMessages([]);
      setSelectedChat(null);
    }
  };

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      {/* Sidebar */}
      <Sidebar 
        darkMode={darkMode} 
        chats={chats} 
        onNewChat={handleNewChat} 
        onSelectChat={handleSelectChat} 
        onEditChatName={handleEditChatName}
        onDeleteChat={handleDeleteChat}
      />

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
              placeholder="Type a message..."
              rows="1"
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())} // Enter sends message
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
