import { Bot, SendHorizontal, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import "./modal.scss";

const Modal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [userName, setUserName] = useState("");

  const handleModal = () => {
    setOpenModal(false);
  };
  const handleSubmit = () => {
    sessionStorage.setItem("userName", userName);
    setUserName("");
    setOpenModal(false);
  };
  const user = sessionStorage.getItem("userName");

  useEffect(() => {
    if (user === null) {
      setOpenModal(true);
    }
  }, []);

  return (
    <>
      {openModal && (
        <>
          <div className="modal-overlay"></div>
          <div className="modal-container">
            <X className="close-icon" onClick={handleModal} />
            <Bot />
            <h1>Welcome to Gemini Alpha</h1>
            <div className="submit">
              <input
                type="text"
                placeholder="Please enter you name!"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <SendHorizontal size={18} onClick={handleSubmit} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
