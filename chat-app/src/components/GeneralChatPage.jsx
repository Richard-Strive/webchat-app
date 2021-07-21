import React, { useState, useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";

const socket = io("http://localhost:8800/");

function GeneralChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [itsTyping, setItsTyping] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("chat message", message);
    setMessage("");
  };

  /* 
User is typing function OK

- Create two methods on the server:
1) Call one when the user is pressing the kays

2) Call the other one when the user is not typing 

*/

  /*
 


 */

  const isTyping = () => {
    socket.emit("someevent", true);

    setTimeout(() => {
      socket.emit("someevent", false);
    }, 4000);
  };

  useEffect(() => {
    socket.on("chat message", (data) => {
      setMessages((messages) => messages.concat(data));
    });

    socket.on("welcome", (data) => {
      setConnectedUsers((connectedUsers) => connectedUsers.concat(data));
    });

    socket.on("someevent", (data) => setItsTyping(data));

    socket.on("disconnect", (data) => {
      setMessages((messages) => messages.concat(data));
    });
  }, []);
  return (
    <GeneralChatContainer>
      <h1>Public chat</h1>
      <MessagesContainer>
        <ul>
          {connectedUsers.map((user) => (
            <li>{user.msg}</li>
          ))}
        </ul>
        <Messages>
          {messages.map((message) => (
            <p>{message}</p>
          ))}
        </Messages>
        <form id="form" action="" onSubmit={(e) => handleSubmit(e)}>
          {itsTyping ? "user is typing..." : ""}
          <MessageInput
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={() => isTyping()}
            placeholder="Type your first message here..."
          />
          <FormButton type="submit">Send</FormButton>
        </form>
      </MessagesContainer>
    </GeneralChatContainer>
  );
}

export default GeneralChatPage;

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
  overflow: auto;
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
