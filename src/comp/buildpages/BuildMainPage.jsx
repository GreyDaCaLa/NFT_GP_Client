import { useEffect, useRef, useState } from "react";
import { useBlackBox } from "../context/BlackBoxProvider";
import logoplayer from "../../assets/playericon.svg"; 
import logobuilding from "../../assets/townicon.svg";

function Build_MainPage({ setPage }) {
    const {
        feildDEM,
        setFeildDEM,
        preset_Object,
        setPreset_Object,
        Peeps,
        Towns,
        Items,
      } = useBlackBox ();
      const [testback, settestback] = useState ([])
      const [tryonce, setTryonce] = useState(true)
    
      const in_rows = useRef ();
      const in_cols = useRef();
      const in_midspace = useRef();
      const in_tilesize = useRef();
      const in_presetup = useRef();

      
  // const testarr=Array(40)
  const testarr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];



      // gets set demensions and or presets and sets them to state
  function getsettings() {
    if (!in_presetup.current.value) {
      console.log("---geting settings Demensions---");
      let res = new Array(4);
      res[0] = in_rows.current.value ? in_rows.current.value : 5;
      res[1] = in_cols.current.value ? in_cols.current.value : 10;
      res[2] = in_midspace.current.value ? in_midspace.current.value : 5;
      res[3] = in_tilesize.current.value ? in_tilesize.current.value : 30;

      console.log(res);
      setFeildDEM(res);
      setPage(1);
    } else {
      console.log("---geting settings from PRE SETUP---");
      // console.log(in_presetup.current.value)
      try {
        let resultingstuff = JSON.parse(in_presetup.current.value);
        console.log("the result");
        console.log(resultingstuff);
        setPreset_Object(resultingstuff.fighters);
        setFeildDEM(resultingstuff.dem);
        setPage(1);
      } catch (error) {
        // console.log('the error: ',error)
        console.log("YO Something wrong with that string you gave me");
        alert(
          "YO Something wrong with that string you gave me in the pre setup block, check it out "
        );
      }
    }
  }

  async function getdomis(url = '', data = {}) {
    const response = await fetch(url, {method: 'GET', mode: "cors"})
      .then(result =>{ return result.json()}
      )
    console.log("made it to end")
    console.log("response",response)
    settestback(response)
    // return response; // parses JSON response into native JavaScript objects
    }
    
      useEffect (() => {
        // console.log("hello again");
        // console.log(in_rows.value?? 5)
        // console.log(feildDEM);
    
        console.log("the test back", testback)
    
        
    
        if(tryonce){
          setTryonce(false)
          console.log("going to make call")
          getdomis('http://localhost:5000/api/domi/')
          // console.log("the---data:",data)
          // settestback(data)
        }
    
    
      }, [testback]);
    
    
    


    function pageoptions() {
        return (
          <>
            <div className="container">
              <div className="row justify-content-center">
                <div className="mt-3 col-5 d-flex align-items-center justify-content-center">
                  <div className="w-100">
                    <h3 className="text-center">CHOOSE WHAT TO BUILD</h3>
    
                    <div className="mb-3">
                      <button
                        onClick={() => {
                          setPage(11);
                        }}
                        className="btn btn-danger w-100"
                      >
                        {" "}
                        BUILD PEEP
                      </button>
                    </div>
    
                    <div className="mb-3">
                      <button
                        onClick={() => {
                          setPage(12);
                        }}
                        className="btn btn-danger w-100"
                      >
                        {" "}
                        BUILD TOWN
                      </button>
                    </div>
    
                    <div className="mb-3">
                      <button
                        onClick={() => {
                          setPage(13);
                        }}
                        className="btn btn-danger w-100"
                      >
                        {" "}
                        BUILD ITEM
                      </button>
                    </div>
                  </div>
                </div>
    
                {/* <div className="col-auto d-flex align-items-center">
                  <h3>OR</h3>
                </div>
    
                <div className="col-5 mt-3 d-flex align-items-center">
                  <div className="mb-3 w-100">
                    <h3 className="text-center">
                      ENTER PRESET
                      <br />
                      SET UP
                    </h3>
    
                    <textarea
                      ref={in_presetup}
                      className="form-control"
                      id="presetupfrominput"
                      placeholder="INSERT RENDERED STRING HERE"
                      rows="10"
                    ></textarea>
                  </div>
                </div> */}
    
                <div className="col-10 m-3">
                  <button
                    onClick={() => {
                      getsettings();
                    }}
                    className="btn btn-danger w-100"
                  >
                    {" "}
                    DONE BUILDING
                  </button>
                </div>
              </div>
            </div>
    
            <div className="container width-auto ">
              <h3 className="text-center">VIEW PEEPS</h3>
              <div className="overflow-auto d-flex flex-nowrap pb-3">
                {console.log(testback)}
                {testback.map((kn) => {
                  return (
                    <div className="me-2">
                      <div
                        className="card"
                        style={{ backgroundColor: "darkgreen", width: "10rem" }}
                      >
                        <img
                          src={logoplayer}
                          class="card-img-top border border-dark border-3"
                          alt="nadapic"
                        />
                        <div class="card-body">
                          <h5 class="card-title">{kn.name}</h5>
                          <div className="row row-cols-2 p-1">
    
                          <span class="card-text">LVL: {kn.level}</span>
                          <span class="card-text ps-1 pe-1">EXP: {"()"}</span>
                          <span class="card-text ps-1 pe-1">MNC: {kn.MNC}</span>
                          {/* <span class="card-text">Atk:0</span>
                          <span class="card-text">Atk:0</span>
                          <span class="card-text">Atk:0</span> */}
                          </div>
                          <a href="#" class="btn btn-primary">
                            edit me button maybe
                          </a>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
    
            <div className="container">
              <h3 className="text-center">VIEW TOWNS</h3>
              <div className="overflow-auto d-flex flex-nowrap pb-3">
                {Object.keys(Towns).map((kn) => {
                  return (
                    <div className="me-2">
                      <div
                        className="card"
                        style={{ backgroundColor: "darkgreen", width: "10rem" }}
                      >
                        <img
                          src={logobuilding}
                          class="card-img-top border border-dark border-3"
                          alt="nadapic"
                        />
                        <div class="card-body">
                          <h5 class="card-title">{Towns[kn]['name']}</h5>
                          <div className="row row-cols-2 p-1">
    
                          <span class="card-text">Atk:0</span>
                          <span class="card-text">Atk:0</span>
                          <span class="card-text">Atk:0</span>
                          <span class="card-text">Atk:0</span>
                          <span class="card-text">Atk:0</span>
                          <span class="card-text">Atk:0</span>
                          </div>
                          <a href="#" class="btn btn-primary">
                            edit me button maybe
                          </a>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
    
            <div className="container">
              <h3 className="text-center">VIEW ITEMS</h3>
              <div className="overflow-auto d-flex flex-nowrap pb-3">
                {Object.keys(Items).map((kn) => {
                  return (
                    <div className="me-2">
                      <div
                        className="card"
                        style={{ backgroundColor: "darkgreen", width: "10rem" }}
                      >
                        <img
                          src={`../assets/images/Picture`+ ( Math.floor( 36*Math.random() ) ) +`.svg` }
                          class="card-img-top border border-dark border-3"
                          alt="nadapic"
                        />
                        <div class="card-body">
                          <h5 class="card-title">{Items[kn]['name']}</h5>
                          <div className="row row-cols-2 p-1">
    
                          <span class="card-text">Atk:0</span>
                          <span class="card-text">Atk:0</span>
                          <span class="card-text">Atk:0</span>
                          <span class="card-text">Atk:0</span>
                          <span class="card-text">Atk:0</span>
                          <span class="card-text">Atk:0</span>
                          </div>
                          <a href="#" class="btn btn-primary">
                            edit me button maybe
                          </a>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        );
      }

    return pageoptions()

}

export default Build_MainPage;