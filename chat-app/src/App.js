import "./App.css";
import GeneralChatPage from "./components/GeneralChatPage";
import React, { useEffect } from "react";
import io from "socket.io-client";

function App() {
  useEffect(() => {
    io("http://localhost:8800/");
  }, []);
  return (
    <div className="App">
      <GeneralChatPage />
    </div>
  );
}

export default App;
