import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import neon from "../assets/neon.jpg";
import { RiSendPlaneLine } from "react-icons/ri";

const SendIcon = styled(RiSendPlaneLine)`
  font-size: 30px;
  color: #494747;
`;

function PrivateChat({ socket }) {
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]);
  const [owner, setOwner] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const me = useSelector((state) => state.me);

  // SORT USERS AND OWN NAME FIRST
  const newUserList = users.sort((a, b) => {
    if (a.username === me) return -1;
    if (b.username === me) return 1;
    if (a.username < b.username) return -1;
    return a.username > b.username ? 1 : 0;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("pvt", {
      message,
      to: selectedUser.userID,
    });
    setMessages((messages) => messages.concat({ message, from: socket.id }));
    setMessage("");
  };

  useEffect(() => {
    socket.on("users", (data) => setUsers(data));
    socket.on("pvt", (data) => console.log(data));
    socket.on("pvt", (data) => {
      setMessages((messages) => messages.concat(data));
    });
    socket.on("connect", () => {
      const meObj = {
        name: socket.auth.name,
        id: socket.id,
      };
      setOwner(meObj);
    });
  }, []);
  return (
    <PrivateChatContainer neon={neon}>
      <UsersList>
        {newUserList.map((user, index) => (
          <SingleUser key={index} onClick={() => setSelectedUser(user)}>
            <p>{user.username}</p>
            <small>Online</small>
          </SingleUser>
        ))}
      </UsersList>
      <ChatBox>
        <SelectedUser>
          <h3>{selectedUser.username}</h3>
        </SelectedUser>
        <ChatMessages>
          {selectedUser &&
            messages.map((msg) => {
              return (
                msg.from === selectedUser.userID && (
                  <SingleMsg>
                    <p>{msg.message}</p>
                  </SingleMsg>
                )
              );
            })}
          {messages.map((msg) => {
            return (
              msg.from === owner.id && (
                <SingleMsgMe>
                  <p>{msg.message}</p>
                </SingleMsgMe>
              )
            );
          })}
        </ChatMessages>
        <ChatForm onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Write here your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <ChatBtn type="submit">
            <SendIcon />
          </ChatBtn>
        </ChatForm>
      </ChatBox>
    </PrivateChatContainer>
  );
}

export default PrivateChat;

const PrivateChatContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url(${(props) => props.neon});
  background-size: 1600px 900px;
  display: flex;
`;
const UsersList = styled.div`
  height: 100vh;
  width: 30vw;
  background-color: rgba(255, 255, 255, 0.5);
  overflow: auto;
`;
const SingleUser = styled.div`
  height: 10vh;
  width: 90%;
  border-radius: 10px;
  margin: 20px;
  background-color: rgb(255, 255, 255);
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  font-weight: 600;
  color: #928c8c;

  p,
  small {
    margin-left: 5px;
  }

  &:hover {
    border: 1px solid #feedf4;
    background-color: #9fabfc;
    color: white;
  }
  transition: all 250ms ease;
  cursor: pointer;
`;

const ChatBox = styled.div`
  height: 100%;
  width: 67%;
  flex: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const SelectedUser = styled.div`
  height: 5vh;
  width: 80%;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  opacity: 0.9;
  color: #646161;
`;

const ChatMessages = styled.div`
  width: 80%;
  border-radius: 15px;
  height: 65%;
  overflow: auto;
  background-color: rgba(179, 222, 235, 0.5);
`;

const ChatForm = styled.form`
  height: 15vh;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-around;

  input {
    border-radius: 30px;
    height: 55%;
    width: 85%;
    font-size: 15px;
    opacity: 0.75;
    border: none;
    padding-left: 15px;
    &:focus {
      outline: none;
    }
  }
`;

const ChatBtn = styled.button`
  height: 55%;
  width: 60px;
  border-radius: 30px;
  background-color: rgba(179, 222, 235, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;

  border: 1px solid lightgray;

  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
    border-color: #0582e7;
  }

  transition: all 250ms ease;
`;

const SingleMsg = styled.div`
  width: 100%;
  height: 15%;
  margin-top: 10px;

  display: flex;
  align-items: center;

  p {
    background-color: #45fa45;
    margin-left: 5px;

    padding: 8px;
    border-bottom-right-radius: 20px;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;

    font-weight: bold;
  }
`;
const SingleMsgMe = styled.div`
  width: 100%;
  height: 15%;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  p {
    margin-right: 10px;
    background-color: #26afe6;
    padding: 8px;
    border-bottom-left-radius: 20px;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    font-weight: bold;
  }
`;
