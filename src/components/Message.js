import React from "react";
import ReactMarkdown from "react-markdown";

const Message = ({ role, content }) => {
  return (
    <div className={`message ${role === "user" ? "user" : "bot"}`}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default Message;

