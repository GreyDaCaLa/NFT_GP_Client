import { useEffect, useRef, useState } from "react";
import {
  takeaction,
  useAnimationFrame,
} from "./logic";
import ObjTile from "./ObjTile";
import Tile from "./Tile";

function MovingCharacters({
  TileSize,
  GapSpacing,
  selected,
  mod,
  fighters,
  startG,
  setFighters,
  setStartG,
}) {
  // let {
  //   TileSize,
  //   GapSpacing,
  //   selected,
  //   mod,
  //   fighters,
  //   startG,
  //   setFighters,
  //   setStartG,
  // } = props;
  
  // const [people,setpeople] = useState({fighters,list:Object.keys(fighters) });
  // const [list,setList] = useState( Object.keys(fighters)  )
  // console.log(people)

  let delaytime = useRef(0);

  let allCharacters = Object.keys(fighters);

  // if one side is all out the game is over
  let attackers = allCharacters.filter((ele) => { return ele.includes("A");});
  let defenders = allCharacters.filter((ele) => { return ele.includes("D")});
  if(attackers.length<=0){ setStartG(false) }
  if(defenders.length<=0){ setStartG(false) }

  // if one side is all out the game is over
  // function Att_list(allchar){
  //   let attackers = allCharacters.filter((ele) => {
  //     return ele.includes("A")&&fighters[ele];
  //   });
  //   return attackers;
  // }
  // function Def_list(allchar){
  //   let defenders = allCharacters.filter((ele) => {
  //     return ele.includes("D")&&fighters[ele];
  //   });
  //   return defenders
  // }



  // let justonce = false;

  function display_Att_Character(c_name) {
    // console.log("min ind:------");
    // console.log("min ind:", attkrs[obj.Tile.index]);
    if (fighters[c_name]) {
      //   console.log("found one");
      //   console.log(fighters[c_name]);
      return (
        <ObjTile
          x={fighters[c_name].x}
          y={fighters[c_name].y}
          size={TileSize}
          color={"transparent"}
          str={fighters[c_name].stats.hp}
          index={fighters[c_name].ind}
          icon={"/assets/images/baby.svg"}
          sty={"cellregTile" + " Self_dex3"}
          //   decRes={decRes}
        />
      );
    } else {
      return "";
    }
  }

  function display_Def_Character(c_name) {
    // console.log("min ind:------");
    // console.log("min ind:", attkrs[obj.Tile.index]);
    if (fighters[c_name].typ == "minion") {
      //   console.log("found one");
      //   console.log(fighters[c_name]);
      return (
        <ObjTile
        key={`gogo-${fighters[c_name].ind}`}
          x={fighters[c_name].x}
          y={fighters[c_name].y}
          size={TileSize}
          color={"grey"}
          str={fighters[c_name].stats.hp}
          index={fighters[c_name].ind}
          icon={"/assets/images/baby.svg"}
          sty={"cellregTile" + " Self_dex3"}
          //   decRes={decRes}
        />
      );
    } else if (fighters[c_name].typ == "building") {
      //   console.log("found one");
      // console.log(fighters[c_name]);
      return (
        <ObjTile
        key={`gogo-${fighters[c_name].ind}`}
          x={fighters[c_name].x}
          y={fighters[c_name].y}
          size={TileSize * 2 + GapSpacing}
          color={"red"}
          str={fighters[c_name].stats.hp}
          index={fighters[c_name].ind}
          icon={"/assets/images/baby.svg"}
          sty={"cellBuildingTile" + " Self_dex3"}
          //   decRes={decRes}
        />
      );
    } else {
      return "";
    }
  }

  function clense(old){
    let another ={};
    for(let k in old){
      if(old[k].stats.hp>0){
        another[k]=old[k];
      }
    }
    console.log(another);
    return another
  }

  // function newsetupPLEASE(gogo){
  //   let babies = {}
  //   let anotheroneagain=clense(gogo);
  //   babies['fighters'] = anotheroneagain;
  //   babies['list'] = Object.keys(anotheroneagain)

  //   // let allCharacters = Object.keys(anotheroneagain);

  //   setpeople(babies);
  //   // setList(Object.keys(anotheroneagain))
  //   // if (attackers.length <= 0 || defenders.length <= 0) {
  //   //   setStartG(false);
  //   // }


  // }

  const stepstatus = useRef(document.getElementById("stepbutton"));
  const autostatus = useRef(document.getElementById("autobutton"));

  useAnimationFrame((dt) => {
  //   let full = Object.keys(fighters)
  //   let A = Att_list(full);
  //   let B = Def_list(full);
  //   console.log('A:',A.length , " B",B.length)
  // if (A.length <= 0 || B.length <= 0) {
  //   setStartG(false);
  // }

      if(!(delaytime>=1000)){
        delaytime=0;
        let step_text = "";
        let auto_text = "";
        if (stepstatus.current) {
          step_text = stepstatus.current.textContent;
        }
        if (autostatus.current) {
          auto_text = autostatus.current.textContent;
        }
        // console.log(step_text)
        if ((step_text == "stepping" || auto_text == "Playing") && (attackers.length && defenders.length) ) {
          let nextstep=takeaction (TileSize,dt, {...fighters}, allCharacters,attackers,defenders);
          // newsetupPLEASE(nextstep)
          // setpeople(nextstep);
          setFighters(nextstep)
        }
      }else{
        delaytime+=dt
      }

  });

  return (
    <>
      {/* {console.log("size fo board for game: ", board.length)} */}
      {/* {attackers.map((c_name) => {
        return <>{display_Att_Character(c_name)}</>;
      })}
      {defenders.map((c_name) => {
        return <>{display_Def_Character(c_name)}</>;
      })} */}
            {(Object.keys(fighters)).map((c_name) => {
        return display_Def_Character(c_name);
      })}
    </>
  );
}

export default MovingCharacters;
