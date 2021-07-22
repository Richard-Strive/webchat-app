import React, { useState, useEffect } from "react";
import styled from "styled-components";

function PrivateChat({ socket }) {
  const [selectedUser, setSelectedUser] = useState();
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages((messages) => messages.concat(message));

    setMessage("");
  };

  useEffect(() => {
    socket.on("user connected", (data) =>
      setUsers((users) => users.concat(data))
    );
  }, []);
  return (
    <PrivateChatContainer>
      <ConnectedUsersList>
        <SingleUserContainer>
          <p>User</p>
          <small>Online</small>
        </SingleUserContainer>
      </ConnectedUsersList>
      <ChatBoxContainer>
        {selectedUser && <div>{selectedUser}</div>}
        <ChatMessages>
          {messages.map((msg) => (
            <SingleMessage>{msg}</SingleMessage>
          ))}
        </ChatMessages>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <ChatInput
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="write here..."
          />

          <SubmirBtn type="submit">Send</SubmirBtn>
        </form>
      </ChatBoxContainer>
    </PrivateChatContainer>
  );
}

export default PrivateChat;

const PrivateChatContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: lightgray;
  display: flex;
`;

const ConnectedUsersList = styled.div`
  width: 30vw;
  height: 100vh;
  background-color: lightskyblue;
  overflow: auto;
`;

const SingleUserContainer = styled.div`
  height: 13vh;
  background-color: bisque;
  display: flex;
  padding-left: 15px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  cursor: pointer;
`;

const ChatBoxContainer = styled.div`
  height: 100vh;
  width: 70vw;
  background-color: #ffff61;
`;

const ChatMessages = styled.div`
  height: 84.6%;
  width: 100%;
  background-color: orange;
`;

const ChatInput = styled.input`
  border: none;
  height: 15%;
  width: 100%;
  background-color: orchid;
`;

const SubmirBtn = styled.button`
  outline: none;
  border: none;
  background-color: saddlebrown;
  border-radius: 20px;
`;

const SingleMessageMe = styled.div`
  height: 20%;
  width: fit-content;
  background-color: lightblue;
`;
const SingleMessage = styled.div`
  /* height: 0%; */
  border-radius: 10px;
  margin-bottom: 10px;
  width: fit-content;
  background-color: blue;
`;
