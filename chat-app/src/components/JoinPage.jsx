import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "react-loader-spinner";
import peoples from "../assets/peoples.jpg";

import styled from "styled-components";

// dispatch({ type: "COMING_SOON", payload: false })

function JoinPage({ socket, useHistory }) {
  const [name, setName] = useState("");
  const [loader, setLoader] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSumbit = (e) => {
    setLoader(true);
    e.preventDefault();
    socket.auth = { name };

    setTimeout(() => {
      setLoader(false);
      dispatch({ type: "ME", payload: `${name}` });
      socket.connect();
      history.push("/private");
    }, 3000);
  };

  useEffect(() => {}, []);
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
            placeholder="Write your nickname"
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
    padding-left: 15px;
    font-size: 14px;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    font-style: oblique;
  }

  input:focus {
    border: none;
    outline: none;
  }
`;
