import { Image, SendHorizontal } from "lucide-react";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { generateGeminiResponse } from "../../api/geminiApi";
import "./gemini-chat.scss";

const GeminiChat = () => {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setError(null); // Reset error message on each submit

    try {
      const geminiResponse = await generateGeminiResponse(input);
      const response = geminiResponse || "Sorry, no response from Gemini.";

      // Update chat history with the question and answer
      setChatHistory([...chatHistory, { question: input, answer: response }]);
      setInput(""); // Clear the input after submission
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
    <div className="gemini-chat-container">
      <div className="chat-history">
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
        <input
          type="text"
          value={input}
          placeholder="Ask Gemini Alpha..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <span className="submit-container">
          <Image color="#8f93c0" />
          <SendHorizontal
            color="#8f93c0"
            className="submit"
            onClick={handleSubmit}
          />
        </span>
      </div>

      {error && <p className="error-message">{error}</p>}

      {loading && <p>Loading...</p>}
    </div>
  );
};

export default GeminiChat;
