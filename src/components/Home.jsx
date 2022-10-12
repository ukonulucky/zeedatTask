import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Audio, ColorRing } from "react-loader-spinner";

import "./styles/home.css";

export default function Home() {
  const [state, setState] = useState([]);
  const [error, setError] = useState("");
  const [actors, setActors] = useState("");
  const mySpan = useRef();
  const myHome = useRef();

  const moviesUrl = "https://swapi.dev/api/films";
  const getMovies = async (i) => {
    try {
     
      const res = await axios.get(i);
      if (res.status === 200) {
        console.log("code running");
        const info = res;
        return info;
      }
    } catch (err) {
      setError(err.message);
      console.log("this is the error", err.message);
    }
  };
  useEffect(() => {
    async function getData() {
      try {
        const result = await getMovies(moviesUrl);
        if (result.data.results) {
          console.log("this is the result", result.data.results);
          setState(result.data.results);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    getData();
  }, []);

  const liGenerate =  () =>
    state[0]?.characters.map(async (k) => {
      async function getActors() {
        try {
          console.log("this are the links", k);
        const res = await getMovies(k);
        if (res) {
          console.log(res.data)
          return res;
        }
        } catch (error) {
          console.log(error.message);
          
        }
      }
    const actorsData = await getActors();
    setActors(actorsData)
    });
  liGenerate();
  

  // const stateEle =

  const animate = () => {
    mySpan.current.classList.toggle("animateRight");
    myHome.current.classList.toggle("homeBlue");
  };
  return (
    <div className="home" ref={myHome}>
      <div className="toggle">
        <span
          ref={mySpan}
          onClick={() => {
            animate();
          }}
        ></span>
      </div>
      {/* {state.length > 0 ? (
        <ul>{stateEle}</ul>
      ) : error !== "" ? (
        <span className="error">
          error:{error} please check network connection and reload browser
        </span>
      ) : (
        <div className="spinner">
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
        </div>
      )} */}
    </div>
  );
}
