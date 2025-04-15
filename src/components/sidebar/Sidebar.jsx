import {
  AlignJustify,
  Bolt,
  Gem,
  MessageCirclePlus,
  ShieldQuestion,
} from "lucide-react";
import React, { useState } from "react";
import "./Sidebar.scss";

const Sidebar = ({ handleInputFocus }) => {
  const [extended, setExtended] = useState(false);
  const chatHistory = localStorage.getItem("chatHistory");
  const formatChatHistory = JSON.parse(chatHistory);

  const handleCollapse = () => {
    setExtended((prev) => !prev);
  };
  return (
    <div className="sidebar-container">
      <div className="top-container">
        <AlignJustify
          color="#8f93c0"
          size={24}
          cursor={"pointer"}
          onClick={handleCollapse}
        />
        <span
          className="new-chat"
          onClick={() => {
            handleInputFocus();
            handleCollapse();
          }}
        >
          <MessageCirclePlus color="#121212" />
          {extended && " New Chat"}
        </span>

        {extended && (
          <span className="recent-chat">
            <h2>Recent</h2>
            {formatChatHistory?.map((chat, index) => {
              return <p key={index}>{chat.question}</p>;
            })}
          </span>
        )}
      </div>
      <div className="bottom-container">
        <Gem color="#8f93c0" />
        <ShieldQuestion color="#8f93c0" />
        <Bolt color="#8f93c0" />
      </div>
    </div>
  );
};

export default Sidebar;
