import { useEffect, useRef, useState } from "react";
import { useAnimationFrame } from "./logic";
import ObjTile from "./ObjTile";
import Tile from "./Tile";

function Board(props) {
  
  let {
    Gridrows = 1,
    Gridcols = 1,
    GapSpacing = 5,
    TileSize = 20,
    mod,
    board,
    fighters,
    move
  } = props;

  let rows = Gridrows;
  let cols = Gridcols;
  let gtS = TileSize;
  let spM = GapSpacing; // middle spacing
  let spX = gtS; //initial spacing x
  let spY = gtS; //initial spacing y

  // const [game,setGame] = useState(false);

  function Makeboardarr() {
    console.log("Making board for first time");
    let arrsize = rows * cols;
    let arr = new Array(arrsize);
    //             <div className="new2cell" style={{top:"100px", left:"500px" }}>1</div>
    for (let i = 0; i < arrsize; i++) {
      arr[i] = {
        Tile: {
          x: spX + (i % cols) * (gtS + spM),
          y: spY + Math.floor(i / cols) * (gtS + spM),
          size: gtS,
          color: "green",
          str: "",
          index: i,
          icon: "",
          sty: "cellregTile",
        },
        Type: "reg_E",
      };
    }
    mod({ replace: arr });
  }

  function displayCharacters() {

    let allCharacters = Object.keys(fighters);

    return (
    <>
    {allCharacters.map((c_name)=>{
      if (fighters[c_name].typ == "minion") {
        //   console.log("found one");
        //   console.log(fighters[c_name]);
        return (
          <ObjTile
          key={`goingfor2-${fighters[c_name].ind}`}
            x={fighters[c_name].x}
            y={fighters[c_name].y}
            size={TileSize}
            color={c_name.includes('D')?"grey":'blue'}
            str={fighters[c_name].stats.hp}
            index={fighters[c_name].ind}
            icon={"/assets/images/baby.svg"}
            mod={mod}
            sty={"cellregTile" + " Self_dex3"}
          />
        );
      } else if (fighters[c_name].typ == "building") {
        //   console.log("found one");
        // console.log(fighters[c_name]);
        return (
          <ObjTile
          key={`goingfor2-${fighters[c_name].ind}`}
            x={fighters[c_name].x}
            y={fighters[c_name].y}
            size={TileSize * 2 + GapSpacing}
            color={"red"}
            str={fighters[c_name].stats.hp}
            index={fighters[c_name].ind}
            icon={"/assets/images/baby.svg"}
            mod={mod}
            sty={"cellBuildingTile" + " Self_dex3"}
            //   decRes={decRes}
          />
        );
      } else {
        return "";
      }

    })}
    </>
    )
//###############################################
  }

  function displayCell(obj) {
    // console.log()
    return (
      <Tile
      key={`goingfortile-${obj.Tile.index}`}
        x={obj.Tile.x}
        y={obj.Tile.y}
        size={obj.Tile.size}
        color={obj.Tile.color}
        str={obj.Tile.str}
        index={obj.Tile.index}
        icon={obj.Tile.icon}
        mod={mod}
        sty={obj.Tile.sty}
      />
    );
  }

  useEffect(() => {
    if (!board.length) {
      Makeboardarr();
    }

  });


  return (
    <>
    

      {/* {console.log("size fo board for game: ", board.length)} */}
      {board.map((cell) => {
        return (
            displayCell(cell)
        );
      })}
      {move?'':displayCharacters()}

      <Tile
        x={spX + cols * spM + gtS * cols}
        y={spY + rows * spM + gtS * rows}
        size={gtS}
        sty="cellregTile"
        // color="orange"
        color="transparent"
      />


    </>
  );
}

export default Board;
