import { useRef } from "react";
import { useBlackBox } from "../context/BlackBoxProvider";

function Build_Item({setPage}){
    const { Items, setItems } = useBlackBox();
  
    const in_Rarity = useRef();
    const in_Atk = useRef();
    const in_Spd = useRef();
    const in_Rng = useRef();
    const in_Hp = useRef();
    const in_Lck = useRef();
    const in_ChgL = useRef();
    const in_Name = useRef();
    const in_imgnum = useRef();
    const in_span = useRef();
  
    function getdefaultname() {
      // console.log('default naming')
      let count = 0;
      let temp = "TownoKevo_";
      while (Items[temp + count]) {
        count++;
      }
  
      return temp + count;
    }
  
    function checkName(str) {
      if (str == "") {
        return false;
      }
  
      if (Items[str]) {
        return false;
      }
      return true;
    }

    function getrandoimage(){


    }
  
    function getinputs() {
      console.log("---geting settings Demensions---");
      let res = {};
      res["name"] = in_Name.current.value ? in_Name.current.value : getdefaultname();
      res["rarity"] = in_Rarity.current.value ? in_Rarity.current.value : 1;
      res['image'] = getrandoimage(); 
      res['span'] = in_span.current.value ? in_span.current.value : 1; 
      res["atk"] = in_Atk.current.value? in_Atk.current.value:0; 
      res["spd"] = in_Spd.current.value? in_Spd.current.value:0; 
      res["rng"] = in_Rng.current.value? in_Rng.current.value:0; 
      res["hp"] = in_Hp.current.value? in_Hp.current.value:0; 
      res["lck"] = in_Lck.current.value? in_Lck.current.value:0; 
      res["chgL"] = in_ChgL.current.value? in_ChgL.current.value:0; 
  
      if (!checkName(res["name"])) {
        alert("this name is taken or not okay please enter a different one");
      } else {
        console.log("item just made:",res);
        let moreItems = { ...Items };
        moreItems[res["name"]] = res;
        setItems(moreItems);
        // console.log("current Towns:",moreTowns);
        setPage(0);
      }
    }
  
    function setup_inputs() {
      return (
        <div className="container">
          <h3 className="mt-3 text-center">SETTING UP A NEW ITEM</h3>
          <div className="row justify-content-center">
            <div className="mt-3 col-5 d-flex align-items-center justify-content-center">
              <div className="w-100">

                <div className="input-group mb-3">
                  <span className="input-group-text pt-1 pb-1" id="basic-addon1">
                    <strong>Name:</strong>
                  </span>
                  <input
                    ref={in_Name}
                    id="rowsfrominput"
                    type="text"
                    className="form-control"
                    placeholder="Default->RandoItem"
                  />
                </div>
  
                <div className="input-group mb-3">
                  <span className="input-group-text pt-1 pb-1" id="basic-addon1">
                    <strong>RARITY:</strong>
                  </span>
                  <input
                    ref={in_Rarity}
                    id="rowsfrominput"
                    type="text"
                    className="form-control"
                    placeholder="Default->common"
                  />
                </div>
  
                <div className="input-group mb-3">
                  <span className="input-group-text pt-1 pb-1" id="basic-addon1">
                    <strong>IMAGE NUM:</strong>
                  </span>
                  <input
                    ref={in_imgnum}
                    id="colsfrominput"
                    type="text"
                    className="form-control"
                    placeholder="Default->random"
                  />
                </div>
  
                <div className="input-group mb-3">
                  <span className="input-group-text pt-1 pb-1" id="basic-addon1">
                    <strong>SPAN:</strong>
                  </span>
                  <input
                    ref={in_span}
                    id="spacefrominput"
                    type="text"
                    className="form-control"
                    placeholder="Default->1"
                  />
                </div>
  
                <div className="input-group mb-3">
                  <span className="input-group-text pt-1 pb-1" id="basic-addon1">
                    <strong>ATTACK:</strong>
                  </span>
                  <input
                    ref={in_Atk}
                    id="tilesizefrominput"
                    type="text"
                    className="form-control"
                    placeholder="Default->0"
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text pt-1 pb-1" id="basic-addon1">
                    <strong>SPEED:</strong>
                  </span>
                  <input
                    ref={in_Spd}
                    id="tilesizefrominput"
                    type="text"
                    className="form-control"
                    placeholder="Default->0"
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text pt-1 pb-1" id="basic-addon1">
                    <strong>RANGE:</strong>
                  </span>
                  <input
                    ref={in_Rng}
                    id="tilesizefrominput"
                    type="text"
                    className="form-control"
                    placeholder="Default->0"
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text pt-1 pb-1" id="basic-addon1">
                    <strong>HEALTH:</strong>
                  </span>
                  <input
                    ref={in_Hp}
                    id="tilesizefrominput"
                    type="text"
                    className="form-control"
                    placeholder="Default->0"
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text pt-1 pb-1" id="basic-addon1">
                    <strong>LUCK%:</strong>
                  </span>
                  <input
                    ref={in_Lck}
                    id="tilesizefrominput"
                    type="text"
                    className="form-control"
                    placeholder="Default->0"
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text pt-1 pb-1" id="basic-addon1">
                    <strong>CHARGE LIMIT:</strong>
                  </span>
                  <input
                    ref={in_ChgL}
                    id="tilesizefrominput"
                    type="text"
                    className="form-control"
                    placeholder="Default->0"
                  />
                </div>

              </div>
            </div>
  
            {/* <div className="col-auto d-flex align-items-center">
                <h3>OR</h3>
              </div> */}
  
            <div className="col-5 mt-3 d-flex align-items-center border border-3 border-warning">
              <div className="mb-3 w-100">
                <h3 className="text-center">STAT DESCRIPTION</h3>
                <dl>
                  <dt>License Level:</dt>
                  <dl>
                    <dt>EXP Level:</dt>
                    <dt>Money:</dt>
                    <dt>Asset Bank:</dt>
                  </dl>
                </dl>
              </div>
            </div>
  
            <div className="col-10 m-3">
              <button
                onClick={() => {
                  getinputs();
                }}
                className="btn btn-danger w-100"
              >
                {" "}
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      );
    }
  
    return setup_inputs();
  }


export default Build_Item;
