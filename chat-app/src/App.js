import "./App.css";
import React, { useEffect } from "react";

import GeneralChatPage from "./components/GeneralChatPage";
import PrivateChat from "./components/PrivateChat";
import JoinPage from "./components/JoinPage";

import io from "socket.io-client";

const URL = "http://localhost:8800";
const socket = io(URL, { autoConnect: false });

/*

What to implement:

-Nickname support,  
-User it's typing feature OK
-show who's online

*/

function App() {
  useEffect(() => {}, []);
  return (
    <div className="App">
      {/* <GeneralChatPage /> */}
      <JoinPage socket={socket} />
      {/* <PrivateChat socket={socket} /> */}
    </div>
  );
}

export default App;
