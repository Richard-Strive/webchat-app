import React, { useState, useEffect } from "react";
import styled from "styled-components";

function JoinPage({ socket }) {
  const [name, setName] = useState("");

  const [names, setNames] = useState([]);

  const handleSumbit = (e) => {
    e.preventDefault();
    setNames((names) => names.concat(name));
    socket.auth = { name };
    socket.connect();
    setName("");
    console.log(socket);
  };

  useEffect(() => {
    socket.on("users", (data) => console.log(data));
  }, []);
  return (
    <JoinPageContainer>
      <form action="" onSubmit={(e) => handleSumbit(e)}>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="your username"
          value={name}
        />

        <button type="submit">Set</button>
      </form>
    </JoinPageContainer>
  );
}

export default JoinPage;

const JoinPageContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: lime;
  display: flex;
  align-items: center;
  justify-content: center;
`;
