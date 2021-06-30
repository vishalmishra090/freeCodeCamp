import React, { useState,useEffect } from "react";
import "./App.scss";
import DrumPad from "./components/DrumPad";
import Display from "./components/Display";
import Slider from "./components/Slider";
import SettingPad from "./components/SettingPad";
import Loader from "./components/Loader";

function App() {
  let [loading,setLoading] = useState(true)
  let [display, setDisplay] = useState("");
  let [vol, setVol] = useState("50");
  let [kit, setKit] = useState("Drum");
  let [power, setPower] = useState(true);

  const handelDrumPadPlay = (audio) => {
    !loading && setDisplay(audio.id)
  }

  const handelSlider = (e) => {
    setVol(e.target.value);
  };

  const handelSettingChange = (e) => {
    if(e.target.name === "kit"){
      setKit(e.target.value);
      setLoading(true)
    }
    if(e.target.name === "power-btn"){
      setPower((prev) => !prev);
      !loading && setDisplay("Drum Ready")
    }
  };
  useEffect(() => {
    let audioElemList = document.getElementsByTagName("audio");
   
    let audioLoadCompleteCount = 0;

    function isAudioLoaded(e) {
      audioLoadCompleteCount++;
      if(audioLoadCompleteCount === 9){
        setLoading(false)
        setDisplay("Drum Ready")
      }
    }
    if(loading){
       setDisplay(<Loader />);
      [...audioElemList].forEach((audioElem) => {
        audioElem.addEventListener('canplaythrough', isAudioLoaded);
      })
      
    }
    
    let timerId = setTimeout(() => {
        [...audioElemList].forEach((audioElem) => {
          audioElem.volume = vol / 100;
        })
      },50)

    return () => {
      clearTimeout(timerId);
      if(audioLoadCompleteCount === 9){
        [...audioElemList].forEach((audioElem) => {
          audioElem.removeEventListener('canplaythrough', isAudioLoaded);
        })
      } 
    }
  },[vol,loading])
  return (
    <div id="app">
      <div id="drum-machine">

        <DrumPad 
        onPlay={handelDrumPadPlay}
        power={power}
        kit={kit}
        loading={loading}
        />

        <Display 
        power={power}
        displayText={display} 
        vol={vol} 
        kit={kit} />

        <SettingPad 
        onChange={handelSettingChange} 
        kit={kit} 
        power={power}
        />

        <Slider 
        power={power}
        onChange={handelSlider} sliderValue={vol} 
        />

      </div>
    </div>
  );
}

export default App;
