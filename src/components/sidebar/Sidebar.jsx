import {
  AlignJustify,
  Bolt,
  Gem,
  MessageCirclePlus,
  ShieldQuestion,
} from "lucide-react";
import React, { useState } from "react";
import "./Sidebar.scss";

const Sidebar = ({ chatHistory }) => {
  const [extended, setExtended] = useState(false);
  console.log("extended", extended);

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
        <span className="new-chat">
          <MessageCirclePlus color="#121212" />
          {extended && " New Chat"}
        </span>

        {extended && (
          <span className="recent-chat">
            <h2>Recent</h2>
            <p> What is React js and ........</p>
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
