import { useRef } from "react";
import { useBlackBox } from "../context/BlackBoxProvider";

function Build_Peep({ setPage }) {
  const { Peeps, setPeeps } = useBlackBox();

  const in_Level = useRef();
  const in_ActiveItems = useRef();
  const in_Money = useRef();
  const in_ItemBank = useRef();
  const in_Name = useRef();

  function getdefaultname() {
    // console.log('default naming')
    let count = 0;
    let temp = "RandoKevo_";
    while (Peeps[temp + count]) {
      count++;
    }

    return temp + count;
  }

  function checkName(str) {
    if (str == "") {
      return false;
    }

    if (Peeps[str]) {
      return false;
    }
    return true;
  }

  async function makedomis(url = '', data = {}) {
    let thestatus = 0
    const response = await fetch(url, {
      method: 'POST', 
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)


    })
    .then(result=>{
      console.log("step 1:",result)
      thestatus = result.status
      return result.json()
    })
    // .then(result =>{
      //   let bb = result.json()
      //   console.log("step 2:",bb)
      //    return bb})
      // .catch(error => {
        //     // alert("this name is taken or not okay please enter a different one");
        
        //     console.error('There was an error!', error);
        // });
        console.log("made it to end")
        console.log("the status:", thestatus)
        console.log("response",response)
        if(thestatus>=400){
          let dispError = ''
          dispError += "--ERROR--\nStatus Code: " + thestatus+"\n"+ response.message
              alert(dispError);


        }
        return thestatus
    // settestback(response)
    // return response; // parses JSON response into native JavaScript objects
    }

    

  async function getinputs() {
    console.log("---getting settings Demensions---");
    let res = {};
    
    if(in_Name.current.value){
      res["name"] = in_Name.current.value;
      res["level"] = in_Level.current.value ? in_Level.current.value : 1;
      console.log("the body we are sending", res)
      let resStatus = await makedomis("http://localhost:5000/api/domi",res)
      if(resStatus>=200 && resStatus<300){
        
        setPage(0)
      }
    }else{
      //cancel
      alert("name feild can not be empty")
    }
    


    // if (!checkName(res["name"])) {
    // } else {
    //   // console.log("Peep just made:",res);
    //   let morepeeps = { ...Peeps };
    //   morepeeps[res["name"]] = res;
    //   setPeeps(morepeeps);
    //   // console.log("current peeps:",morepeeps);
    //   setPage(0);
    // }
  }

  function setup_inputs() {
    return (
      <div className="container">
        <h3 className="mt-3 text-center">SETTING UP A PEEP</h3>
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
                  placeholder="Default->RandoKevo"
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text pt-1 pb-1" id="basic-addon1">
                  <strong>LEVEL:</strong>
                </span>
                <input
                  ref={in_Level}
                  id="rowsfrominput"
                  type="text"
                  className="form-control"
                  placeholder="Default->1"
                />
              </div>

              {/* <div className="input-group mb-3">
                <span className="input-group-text pt-1 pb-1" id="basic-addon1">
                  <strong>ACTIVE ITEMS:</strong>
                </span>
                <input
                  ref={in_ActiveItems}
                  id="colsfrominput"
                  type="text"
                  className="form-control"
                  placeholder="Default->Empty"
                />
              </div> */}

              {/* <div className="input-group mb-3">
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
              </div> */}

              {/* <div className="input-group mb-3">
                <span className="input-group-text pt-1 pb-1" id="basic-addon1">
                  <strong>ITEM BANK:</strong>
                </span>
                <input
                  ref={in_ItemBank}
                  id="tilesizefrominput"
                  type="text"
                  className="form-control"
                  placeholder="Default->Empty"
                />
              </div> */}
            </div>
          </div>

          {/* <div className="col-auto d-flex align-items-center">
            <h3>OR</h3>
          </div> */}

          <div className="col-5 mt-3 d-flex align-items-center border border-3 border-warning">
            <div className="mb-3 w-100">
              <h3 className="text-center">STAT DESCRIPTION</h3>
              <dl>
                <dt>Level:</dt>
                <dd>
                  typically the over all level of the PEEP. Also used to
                  determin the amount of Minions they can command. formula is
                  minion count = 5 + (lvl-1)*2
                </dd>
                <dl>
                  <dt>Active Items:</dt>
                  <dt>Money:</dt>
                  <dt>Item Bank:</dt>
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

export default Build_Peep;
