import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Audio, ColorRing } from "react-loader-spinner";

import "./styles/home.css";

export default function Home() {
  const [error, setError] = useState("");
  const [actors, setActors] = useState([]);
  const [male, setMale] = useState([]);
  const [all, setAll] = useState([]);
  const [female, setFemale] = useState([]);
  const [state, setState] = useState(false);
  const [feet, setFeet] = useState("");
  const [inch, setInch] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [tableEle, setTableEle] = useState("");
  const mySpan = useRef();
  const myHome = useRef();

  const moviesUrl = "https://swapi.dev/api/films";
  const getMovies = async (i) => {
    try {
      const res = await axios.get(i);
      if (res.status === 200) {
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
        console.log("useEffect RUnning");
        const res = await getMovies(moviesUrl);
        if (res.data.results) {
          const outPut = res.data.results[0].characters;
          const result = outPut.map(async (i) => {
            const res2 = await getMovies(i);
            if (res2.data) {
              const { name, gender, height } = res2.data;
              const actorData = { name, gender, height };
              return actorData;
            }
          });
          const newData = [];
          for (let i = 0; i < result.length; i++) {
            const final = await result[i];
            newData.push(final);
          }
          setActors(newData);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    getData();
  }, []);

  // useEffect(() => {
  //   totalFunc();

  // }, [actors]);

useEffect(() => {
     genFilt("female");
        genFilt("");
           genFilt("male");
},[actors])
  
   useEffect(() => {
    const data = tableEleFunc();
    console.log("this is the data", data)
    setTableEle(data);
  }, [gender]);
  console.log("female array", female)
   console.log("male array", male)
    console.log("all array", all)
  // console.log("this is the actor data", actors);

  const totalFunc = (k) => {
    if (k.length > 0) {
      const heightArray = k.map((i) => parseFloat(i.height));
      const data = heightArray.reduce((a, c) => {
        return a + c;
      }, 0);
      console.log("this is the total", data);
      setHeight(data);
      const feet = 0.0328 * data;
      setFeet(feet);
      const inch = 0.3937 * data;
      setInch(inch);
    }
  };

  const genFilt = (k) => {
    if (k === "") {
      setAll(actors);
    }
    if (k === "male") {
      const data = actors.filter((i) => i.gender === "male");
      setMale(data);
    }
    if (k === "female") {
      const data = actors.filter((i) => i.gender === "female");
      setFemale(data);
    }
  };
  console.log(actors);
const tableJsx =(i) =>  (
  <tr className={state ? "text" : ""}>
            <td> {i.name} </td> <td>{i.height} </td> <td>{i.gender}</td>
 </tr>
)
  const tableEleFunc = () => {
    if (gender === "female") {
  const femaleArray  =  female?.map((i) =>  tableJsx(i) );
   totalFunc(female)
      return femaleArray
    } else if (gender === "male") {
  const maleArray =   male?.map((i) => tableJsx(i) );
  totalFunc(male)
      return maleArray
    } else if (gender === "") {
  const allArray =   all.map((i) => tableJsx(i) );
  totalFunc(all)
      return allArray
    }
  };

  const animate = () => {
    mySpan.current.classList.toggle("animateRight");
    myHome.current.classList.toggle("homeBlue");
    setState(!state);
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
      {actors.length > 0 ? (
        <select
        className="select"
          onChange={(e) => {
            setGender(e.target.value);
          }}
        >
          <option value="">All Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      ) : (
        ""
      )}

      {all.length > 0 ||  male.length > 0 || female.length > 0 ? (
        <table>
          <thead
            onDoubleClick={() => {
              console.log("clicked twice");
            }}
          >
            <tr className={state ? "text" : ""}>
              <th>NAME</th>
              <th>HEIGHT</th>
              <th>GENDER</th>
            </tr>
          </thead>
          <tbody>{tableEle}</tbody>
          <tfoot>
            <tr className={state ? "text" : ""}>
              <td>Total: {actors.length}</td>
              <td>
                {height}cm ({feet}ft/{inch}in)
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
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
      )}
    </div>
  );
}
