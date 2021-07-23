import "./App.css";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";

import GeneralChatPage from "./components/GeneralChatPage";
import PrivateChat from "./components/PrivateChat";
import JoinPage from "./components/JoinPage";

import io from "socket.io-client";

const URL = "http://localhost:8800";

const connOpt = {
  transports: ["websocket", "polling"],
};

const socket = io(URL, { autoConnect: false }, connOpt);

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
      <Router>
        <Switch>
          <Route path="/private">
            <PrivateChat socket={socket} />
          </Route>
          <Route path="/general">
            <GeneralChatPage socket={socket} />
          </Route>
          <Route path="/">
            <JoinPage socket={socket} useHistory={useHistory} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
