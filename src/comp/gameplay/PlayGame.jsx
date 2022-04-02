import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useBlackBox } from "../context/BlackBoxProvider";
import Board from "./Board";
import MovingCharacters from "./MovingCharacters";
// import babyimage from '../assets/baby.svg';

function PlayGame({setPage}) {

  const {fieldDem} = useBlackBox();
  const Grow=fieldDem[0]
  const Gcol=fieldDem[1]
  const Gsp=fieldDem[2]
  const Ts=fieldDem[3]
  
  const [presetonce,setpresetonce] = useState(false)
  const [board, setBoard] = useState([]);
  const [selected, setSelected] = useState(0);
  const [fighters, setFighters] = useState({});
  const [resetF, setResetF] = useState({});
  const [startG, setStartG] = useState(false);
  const [gamewent,setGameWent] = useState(false);

  let basicstats = {
    ind: -1,
    stats: {
      hp: 5,
      atk: 1,
      spd: 1,
      rng: 1,
      chgL: 100,
      chgR: 0,
    },
  };

  let basicinfo = {
    x: -1,
    y: -1,
    typ: "",
  };

  function downloadFile() {
    let allcontent = {dem:[Grow,Gcol,Gsp,Ts],fighters}
    const blob = new Blob([JSON.stringify( allcontent )], {type : 'application/json'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);

  let time = new Date();
  let currtime=`${time.getFullYear()}${time.getMonth()}${time.getDate()}${time.getHours()}${time.getMinutes()}${time.getSeconds()}`


    a.setAttribute("download", `gamesetup-${currtime}.txt`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function check_addition_conditions(type, ind) {
    // console.log("can i add-------------: ", type);
    if (type === "building") {
      // not last col
      if (!((ind + 1) % Gcol)) {
        console.log("this is last col---can't add building");
        return false;
      }
      // not bottom row
      if (ind + 1 > Grow * Gcol - Gcol) {
        console.log("this is last row---can't add building");
        return false;
      }

      let D = ind + Gcol; // check one below clicked tile if used
      let R = ind + 1; // check  one right of clicked tile if used
      let RD = ind + 1 + Gcol; // check bottom right clicked tile if used
      // console.log(`four in question: T: ${ind} , R:${R} , D:${D} , RD:${RD} `);
      if (
        !fighters[ind] &&
        !fighters[ind] && // check clicked tile if used
        !fighters[D] &&
        !fighters[D] && // check one below clicked tile if used
        !fighters[R] &&
        !fighters[R] && // check  one right of clicked tile if used
        !fighters[RD] &&
        !fighters[RD] // check bottom right clicked tile if used
      ) {
        // console.log("----------------------------------yes");
        return true;
      }
    }
    if (type === "minion") {
      if (!fighters["A " + ind] && !fighters["D " + ind]) {
        // console.log("----------------------------------yes");
        return true;
      }
    }

    console.log("default fail to place condition---------- No");
    return false;
  }

  function add_Minion(ind) {
    // console.log("add minion");

    if (check_addition_conditions("minion", ind)) {
      let prefix = "A ";
      let newM = {};
      newM[prefix + ind] = { ...basicstats, ...basicinfo };
      newM[prefix + ind].ind = ind;
      newM[prefix + ind].typ = "minion";
      newM[prefix + ind].x = Ts + (ind % Gcol) * (Ts + Gsp);
      newM[prefix + ind].y = Ts + Math.floor(ind / Gcol) * (Ts + Gsp);
      // console.log('adding: ',newM)
      return { ...newM, ...fighters };
    }
    return fighters;
  }

  function add_DefMinion(ind) {
    let prefix = "D ";
    // console.log("add def minion");

    if (check_addition_conditions("minion", ind)) {
      let newM = {};
      newM[prefix + ind] = { ...basicstats, ...basicinfo };
      newM[prefix + ind].ind = ind;
      newM[prefix + ind].typ = "minion";
      newM[prefix + ind].x = Ts + (ind % Gcol) * (Ts + Gsp);
      newM[prefix + ind].y = Ts + Math.floor(ind / Gcol) * (Ts + Gsp);
      return { ...newM, ...fighters };
    }
    return fighters;
  }

  function add_Building(ind) {
    let prefix = "D ";
    // console.log("add building");
    // console.log(newB);
    if (check_addition_conditions("building", ind)) {
      let newM = {};
      newM[prefix + ind] = { ...basicstats, ...basicinfo };
      newM[prefix + ind].stats.hp = 100;
      newM[prefix + ind].stats.spd = 0;
      newM[prefix + ind].stats.atk = 0;
      newM[prefix + ind].typ = "building";
      newM[prefix + ind].ind = ind;
      newM[prefix + ind].x = Ts + (ind % Gcol) * (Ts + Gsp);
      newM[prefix + ind].y = Ts + Math.floor(ind / Gcol) * (Ts + Gsp);

      // console.log(newB[ind]);
      return { ...newM, ...fighters };
    }
    return fighters;
  }

  function removething(ind) {
    if (fighters["A " + ind]) {
      let newtemp = { ...fighters };
      delete newtemp["A " + ind];
      setFighters(newtemp);
    } else if (fighters["D " + ind]) {
      let newtemp = { ...fighters };
      delete newtemp["D " + ind];
      setFighters(newtemp);
    }
  }

  function modify(obj) {
    console.log("modifing board----");

    if (obj["replace"]) {
      console.log("modifing board---- replace");
      console.log(obj);
      setBoard(obj["replace"]);
    }

    if (obj["userIN"] || obj["userIN"] === 0) {
      // console.log("modifing board----UserIn:", selected);

      switch (selected) {
        case 1:
          setFighters(add_Minion(obj["userIN"]));
          break;
        case 2:
          setFighters(add_Building(obj["userIN"]));
          break;
        case 3:
          setFighters(add_DefMinion(obj["userIN"]));
          break;
        case 0:
        default:
          removething(obj["userIN"]);
          break;
      }
    }
  }

  function showPlacementUI() {
    return (
      <>
        <div className="row">
          <div id="stepbutton" className="col d-flex justify-content-around">
            <button
              className={
                3 == selected ? "btn btn-outline-primary" : "btn btn-primary"
              }
              onClick={() => {
                setSelected(3);
              }}
            >
              Enemy Minions
            </button>
          </div>

          <div className="col d-flex justify-content-around">
            <button
              id="autobutton"
              className={
                2 == selected ? "btn btn-outline-primary" : "btn btn-primary"
              }
              onClick={() => {
                setSelected(2);
              }}
            >
              Buildings
            </button>
          </div>

          <div className="col d-flex justify-content-around">
            <button
              className={
                1 == selected ? "btn btn-outline-primary" : "btn btn-primary"
              }
              onClick={() => {
                setSelected(1);
              }}
            >
              Minions
            </button>
          </div>

          <div className="col d-flex justify-content-around">
            <button
              className={
                0 == selected ? "btn btn-outline-danger" : "btn btn-danger"
              }
              onClick={() => {
                setSelected(0);
              }}
            >
              Remove
            </button>
          </div>
        </div>

        <div>
          <div
            id="gamestatus"
            className="col-6 offset-3 d-flex justify-content-around mt-3"
          >
            <div
              className="btn btn btn-success w-100"
              onClick={() => {
                setSelected(-1);
                setGameWent(true);
                setResetF({...fighters});
                setStartG(true);
              }}
            >
              Start Game
            </div>
          </div>

        {gamewent?'':  <div
            id="gamestatus"
            className="col-6 offset-3 d-flex justify-content-around mt-3"
          >
            <div
              className="btn btn btn-success w-100"
              onClick={() => {downloadFile()}}
            >
              export game set up to txt
            </div>
          </div>}

          <div
            id="gamestatus"
            className="col-6 offset-3 d-flex justify-content-around mt-3"
          >
            <div
              className="btn btn btn-success w-100"
              onClick={() => {setPage(0)}}
            >
              Quit To Set Up Menu
            </div>
          </div>

        </div>
      </>
    );
  }

  function startG_UI() {
    return (
      <>
        <div className="row">
          <div className="col d-flex justify-content-around">
            <button
              id="stepbutton"
              className={selected == 0 ? "btn btn-warning" : "btn btn-primary"}
              onClick={() => {
                setSelected(0);
              }}
            >
              {selected == 0 ? "stepping" : "Step"}
            </button>
          </div>

          <div className="col d-flex justify-content-around">
            <button
              id="autobutton"
              className={selected == 1 ? "btn btn-warning" : "btn btn-primary"}
              onClick={() => {
                setSelected(selected == 1 ? -1 : 1);
              }}
            >
              {selected == 1 ? "Playing" : "Auto"}
            </button>
          </div>

          <div className="col d-flex justify-content-around">
            <button
              className={2 == selected ? "btn btn-warning" : "btn btn-primary"}
              onClick={() => {
                console.log(fighters)
                console.log(resetF)
                setSelected(-1);
                setFighters({...resetF})
              }}
            >
              {selected == 2 ? "Reseting" : "Reset"}
            </button>
          </div>

        </div>

        <div>
          <div className="col-6 offset-3 d-flex justify-content-around mt-3">
            <div
              id="gamestatus"
              className="btn btn btn-danger w-100"
              onClick={() => {
                setSelected(0);
                setFighters(resetF);
                setStartG(false);
              }}
            >
              Stop Game
            </div>
          </div>
        </div>
      </>
    );
  }

  useEffect(() => {
    console.log("playgame use effect");
    if (selected == 0 && startG) {
      setTimeout(() => {
        setSelected(-1);
      }, 1000);
    }
    // if(preset && !presetonce){
    //   setpresetonce(true)
    //   setFighters(preset)
    // }
  }, [startG, selected]);

  return (
    <>
      <div className="container  h-100">
        <div
          className="container overflow-auto Self_new"
          style={{ height: "300px", position: "relative" }}
        >
          <Board
            Gridrows={Grow}
            Gridcols={Gcol}
            TileSize={Ts}
            GapSpacing={Gsp}
            sT={selected}
            mod={modify}
            board={board}
            fighters={fighters}
            move={startG}
          />
          {startG ? (
            <MovingCharacters
              TileSize={Ts}
              GapSpacing={Gsp}
              selected={selected}
              mod={modify}
              fighters={{ ...fighters }}
              startG={startG}
              setFighters={setFighters}
              setStartG={setStartG}
            />
          ) : (
            ""
          )}
        </div>

        {startG ? startG_UI() : showPlacementUI()}
      </div>
    </>
  );
}

export default PlayGame;
