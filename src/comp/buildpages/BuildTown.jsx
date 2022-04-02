import { useRef } from "react";
import { useBlackBox } from "../context/BlackBoxProvider";

function Build_Town({setPage}) {
  const { Towns, setTowns } = useBlackBox();

  const in_LicLevel = useRef();
  const in_ExpLevel = useRef();
  const in_Money = useRef();
  const in_AssetBank = useRef();
  const in_Name = useRef();

  function getdefaultname() {
    // console.log('default naming')
    let count = 0;
    let temp = "TownoKevo_";
    while (Towns[temp + count]) {
      count++;
    }

    return temp + count;
  }

  function checkName(str) {
    if (str == "") {
      return false;
    }

    if (Towns[str]) {
      return false;
    }
    return true;
  }

  function getinputs() {
    console.log("---geting settings Demensions---");
    let res = {};
    res["liclvl"] = in_LicLevel.current.value ? in_LicLevel.current.value : 1;
    res["explvl"] = in_ExpLevel.current.value ? in_ExpLevel.current.value : 1;
    res["money"] = in_Money.current.value ? in_Money.current.value : 0;
    res["assetbank"] = in_AssetBank.current.value ? in_AssetBank.current.value : {};
    res["name"] = in_Name.current.value ? in_Name.current.value : getdefaultname();

    if (!checkName(res["name"])) {
      alert("this name is taken or not okay please enter a different one");
    } else {
      console.log("Town just made:",res);
      let moreTowns = { ...Towns };
      moreTowns[res["name"]] = res;
      setTowns(moreTowns);
      // console.log("current Towns:",moreTowns);
      setPage(0);
    }
  }

  function setup_inputs() {
    return (
      <div className="container">
        <h3 className="mt-3 text-center">SETTING UP A TOWN</h3>
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
                  placeholder="Default->TownoKevo"
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text pt-1 pb-1" id="basic-addon1">
                  <strong>LICENSE LEVEL:</strong>
                </span>
                <input
                  ref={in_LicLevel}
                  id="rowsfrominput"
                  type="text"
                  className="form-control"
                  placeholder="Default->1"
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text pt-1 pb-1" id="basic-addon1">
                  <strong>EXP LEVEL:</strong>
                </span>
                <input
                  ref={in_ExpLevel}
                  id="colsfrominput"
                  type="text"
                  className="form-control"
                  placeholder="Default->1"
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text pt-1 pb-1" id="basic-addon1">
                  <strong>MONEY:</strong>
                </span>
                <input
                  ref={in_Money}
                  id="spacefrominput"
                  type="text"
                  className="form-control"
                  placeholder="Default->0"
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text pt-1 pb-1" id="basic-addon1">
                  <strong>ASSETS BANK:</strong>
                </span>
                <input
                  ref={in_AssetBank}
                  id="tilesizefrominput"
                  type="text"
                  className="form-control"
                  placeholder="Default->Empty"
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

export default Build_Town;
