import { useRef, useState } from "react";
// import babyimage from '../assets/baby.svg';
import { useAnimationFrame } from "./logic";

function ObjTile({
  size,
  x,
  y,
  color = "red",
  str = "",
  icon = "",
  index,
  mod,
  sty = "cell_regTile",
}) {



  function displayImage() {
    // console.log("what your looking for")
    // console.log(babyimage)
    return <img src={icon} className="TileImage" />;
  }

  return (
    <div
    key={`objecttile-${index}`}
      className={sty + (x == 50 && y == 160 ? " Self_First_ANI" : "")}
      style={{
        top: y + "px",
        left: x + "px",
        height: size + "px",
        width: size + "px",
        backgroundColor: color,
      }}
      onClick={() => {
        mod({ userIN: index });
      }}
    >
      <span className="toptext">{Math.ceil(str)}</span>
      {icon ? displayImage() : ""}
      {/* <img src={'../assets/baby.svg'} /> */}
    </div>
  );
}

export default ObjTile;
