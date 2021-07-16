import React, { useState, useEffect } from "react";
import styled from "styled-components";

function GeneralChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages((messages) => messages.concat(message));
    setMessage("");
  };
  return (
    <GeneralChatContainer>
      <h1>Public chat</h1>
      <MessagesContainer>
        <Messages>
          {messages.map((message) => (
            <p>{message}</p>
          ))}
        </Messages>
        <form id="form" action="">
          <MessageInput
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your first message here..."
          />
          <FormButton onClick={(e) => handleSubmit(e)}>Send</FormButton>
        </form>
      </MessagesContainer>
    </GeneralChatContainer>
  );
}

export default GeneralChat;

const GeneralChatContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #29d8d8;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const MessagesContainer = styled.div`
  height: 75%;
  width: 75%;
  background-color: #5cb37d;
  position: relative;
`;

const MessageInput = styled.input`
  height: 60px;
  width: 100%;
  border: none;
  outline: none;
  background-color: #9ab9cc;
`;

const Messages = styled.div`
  height: 87%;
  width: 100%;
  background-color: white;
  overflow: auto;
`;

const FormButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
`;
