
import { useState } from 'react';
// import babyimage from '../assets/baby.svg';

function Tile({ size, x, y, color="red", str="", icon='', index, mod, sty="cell_regTile" }) {
    // const [clicked,setClicked] = useState(false);
    // function changeTile(index){


    // }

    function displayImage(){
        // console.log("what your looking for")
        // console.log(babyimage)
        return (<img src={icon} className="TileImage"/>)
    }


  return (
    <div
    key={`tilecell-${index}`}
      className={sty+(x==50&&y==160?' Self_First_ANI':'')}
      style={{
        top: y + "px",
        left: x + "px",
        height: size + "px",
        width: size + "px",
        backgroundColor: color,
      }}
      onClick={()=>{mod({userIN:index})}}
    >
      {icon?displayImage():''}
      {/* {index} */}
      {/* <img src={'../assets/baby.svg'} /> */}
    </div>
  );
}

export default Tile;
