import { useState } from "react";

const useChatStore = () => {
  const [messages, setMessages] = useState([]);

  const addMessage = (role, content) => {
    setMessages([...messages, { role, content }]);
  };

  return { messages, addMessage };
};

export default useChatStore;
