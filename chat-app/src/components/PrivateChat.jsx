import React, { useState } from "react";
import styled from "styled-components";

function PrivateChat() {
  return (
    <PrivateChatContainer>
      <ConnectedUsersList></ConnectedUsersList>
    </PrivateChatContainer>
  );
}

export default PrivateChat;

const PrivateChatContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: lightgray;
`;

const ConnectedUsersList = styled.div`
  width: 30vw;
  height: 100vh;
  background-color: lightskyblue;
`;
