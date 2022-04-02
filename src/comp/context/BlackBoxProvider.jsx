import react, { useContext, useState } from "react";


const BlackBoxContext = react.createContext();


export function useBlackBox() {
    return useContext(BlackBoxContext);
}


export function BlackBoxProvider({children}) {

  const [feildDEM, setFeildDEM] = useState ([]);
  const [preset_Object, setPreset_Object] = useState();
  const [Items, setItems] = useState({});
  const [Towns, setTowns] = useState({});
  const [Peeps, setPeeps] = useState({});
  const [pkd_Town,setPkd_Town] = useState();
  const [pkd_Peep,setPkd_Peep] = useState();


















    const value={
      feildDEM, setFeildDEM, 
      preset_Object, setPreset_Object,
      Items,  setItems,
      Towns,  setTowns,
      Peeps,  setPeeps,
      pkd_Town, setPkd_Town,
      pkd_Peep, setPkd_Peep,
    }


    return (
        <BlackBoxContext.Provider value={value}>
            {children}
        </BlackBoxContext.Provider>
    )
}


