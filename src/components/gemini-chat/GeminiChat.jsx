import {
  Bot,
  BrainCircuit,
  Image,
  SearchCode,
  SendHorizontal,
  Sparkles,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { generateGeminiResponse } from "../../api/geminiApi";
import Topbar from "../Topbar/Topbar";
import "./gemini-chat.scss";

const GeminiChat = ({ inputRef }) => {
  const welcomeData = [
    {
      icon: <Bot />,
      title: "AI Chat Assistant",
      des: "Get instant answers, generate content, and brainstorm ideas using AI-powered chat.",
    },
    {
      icon: <BrainCircuit />,
      title: "Smart Code Helper",
      des: "Write, debug, and optimize your code using intelligent suggestions from AI.",
    },
    {
      icon: <SearchCode />,
      title: "Data Insights",
      des: "Analyze large datasets and extract valuable insights with AI-driven analytics.",
    },
  ];
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatHistoryRef = useRef(null);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const geminiResponse = await generateGeminiResponse(input);
      const response = geminiResponse || "Sorry, no response from Gemini.";

      // Update chat history with the question and answer
      setChatHistory([...chatHistory, { question: input, answer: response }]);
      localStorage.setItem(
        "chatHistory",
        JSON.stringify([...chatHistory, { question: input }])
      );

      setInput("");
    } catch (error) {
      setError("Failed to get response from Gemini.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <>
      <div className="gemini-chat-container">
        <Topbar />
        {chatHistory.length === 0 && !loading && (
          <div className="greeting-container">
            <h1>Welcome Arman</h1>
            <h1>Let’s build something awesome!</h1>
          </div>
        )}
        {chatHistory.length === 0 && !loading && (
          <div className="welcome-container-card">
            {welcomeData.map((data, index) => (
              <div className="card" key={index}>
                <span>{data.icon}</span>
                <h2>{data.title}</h2>
                <p>{data.des}</p>
              </div>
            ))}
          </div>
        )}
        <div className="chat-history" ref={chatHistoryRef}>
          {chatHistory.map((chat, index) => (
            <div key={index} className="chat-item">
              <div className="question">{chat.question}</div>
              <div className="answer">
                <ReactMarkdown>{chat.answer}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>

        <div className="ask-container">
          <textarea
            ref={inputRef}
            type="text"
            value={input}
            placeholder="Ask Gemini Alpha..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={loading}
          />
          <span className="submit-container">
            <Image color="#8f93c0" />
            <SendHorizontal
              color="#8f93c0"
              className={loading ? "gray-btn-bg" : "submit"}
              onClick={handleSubmit}
            />
          </span>
        </div>

        {error && <p className="error-message">{error}</p>}

        {loading && (
          <span className="loading">
            <Sparkles className="spark-icon" />
            Thinking...
          </span>
        )}
      </div>
    </>
  );
};

export default GeminiChat;
