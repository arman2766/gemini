import React, { useRef } from "react";
import GeminiChat from "../gemini-chat/GeminiChat";
import Sidebar from "../sidebar/Sidebar";
import "./chat-layout.scss";

const ChatLayout = () => {
  const inputRef = useRef(null);
  const handleInputFocus = () => {
    inputRef.current.focus();
  };
  return (
    <div className="main-container">
      <Sidebar handleInputFocus={handleInputFocus} />
      <GeminiChat inputRef={inputRef} />
    </div>
  );
};

export default ChatLayout;
