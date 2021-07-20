import "./App.css";
import GeneralChatPage from "./components/GeneralChatPage";
import React, { useEffect } from "react";

/* 
What to implement:

-Nickname support 
-User it's typing feature OK
-show who's online

*/

function App() {
  useEffect(() => {}, []);
  return (
    <div className="App">
      <GeneralChatPage />
    </div>
  );
}

export default App;
