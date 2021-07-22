import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import peoples from "../assets/peoples.jpg";
import neon from "../assets/neon.jpg";

import styled from "styled-components";

function JoinPage({ socket, useHistory }) {
  const [name, setName] = useState("");
  const [loader, setLoader] = useState(false);
  const [names, setNames] = useState([]);
  const [joinedLater, setJoinedLater] = useState([]);

  const history = useHistory();

  const handleSumbit = (e) => {
    setLoader(true);
    e.preventDefault();
    socket.auth = { name };
    socket.connect();

    setTimeout(() => {
      setLoader(false);

      history.push("/private");
    }, 3000);

    console.log(socket);
  };

  useEffect(() => {
    socket.on("users", (data) => setNames(data));
    socket.on("user connected", (data) =>
      setJoinedLater((joinedLater) => joinedLater.concat(data))
    );
  }, []);

  return (
    <JoinPageContainer peoples={peoples}>
      {loader ? (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      ) : (
        <form action="" onSubmit={(e) => handleSumbit(e)}>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Write your nickaname"
            value={name}
          />
        </form>
      )}
    </JoinPageContainer>
  );
}

export default JoinPage;

const JoinPageContainer = styled.div`
  height: 100vh;
  width: 100vw;
  /* background-image: url("https://source.unsplash.com/1600x1600/?talk"); */
  background-image: url(${(props) => props.peoples});
  background-size: 1600px 1000px;

  display: flex;
  align-items: center;
  justify-content: center;

  input {
    border: none;

    border: lightgray;
    background-color: transparent;
    height: 5vh;
    background: rgba(226, 233, 226, 0.753);
    width: 30vw;
    border-radius: 60px;

    font-size: 14px;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    font-style: oblique;
  }

  input:focus {
    border: none;
    outline: none;
  }
`;
