import React from "react";
import GeminiChat from "../gemini-chat/GeminiChat";
import Topbar from "../Topbar/Topbar";
import "./Main.scss";

const Main = () => {
  return (
    <div className="main-container">
      <Topbar />
      {/* <h1>Hello Arman</h1> */}
      <GeminiChat />
    </div>
  );
};

export default Main;
