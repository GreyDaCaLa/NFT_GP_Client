import { useEffect, useRef, useState } from "react";
import { BlackBoxProvider, useBlackBox } from "./context/BlackBoxProvider";
import PlayGame from "./gameplay/PlayGame";
import Build_Peep from "./buildpages/BuildPeeps";
import Build_Town from "./buildpages/BuildTown";
import Build_Item from "./buildpages/BuildItem"; 
import Build_MainPage from "./buildpages/BuildMainPage";
// import logoRandItem from "../assets/Picture28.svg"; 


function PageManager() {
  const [page, setPage] = useState(0);





  function showPage() {
    // 0-9 -- main pages
    // 10-19 -- build/edit pages

    switch (page) {
      case 1:
        return <PlayGame setPage={setPage} />;
      case 13:
        return <Build_Item setPage={setPage} />;
      case 12:
        return <Build_Town setPage={setPage} />;
      case 11:
        return <Build_Peep setPage={setPage} />;

      case 2:
        // return <CombatantsSetup setPage={setPage} />;
      
      // case 3:
      //   return <PlayGame />

      case 0:
      default:
        // return pageoptions();
        return <Build_MainPage setPage={setPage} />;
    }
  }

  return <>{showPage()}</>;
}

export default PageManager;
