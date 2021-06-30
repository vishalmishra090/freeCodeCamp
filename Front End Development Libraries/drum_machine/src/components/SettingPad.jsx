import React from "react";
import RadioBtn from "./RadioBtn";
import {FaPowerOff} from "react-icons/fa"

function SettingPad({
  onChange,
  kit="Drum",
  power=true
}) {
  
  const handelCheck = (e) => {
    onChange(e)
  };
  const handelClick = (e) => {
     e.target.name = "power-btn"
     onChange(e)
  }
  return (
    <div className="setting-pad">
      <RadioBtn
        power={power}
        id="drum"
        name="kit"
        value="Drum"
        onCheck={handelCheck}
        checked={kit === "Drum" ? true : false}
      />
      <RadioBtn
        power={power}
        id="piano"
        name="kit"
        value="Piano"
        onCheck={handelCheck}
        checked={kit === "Piano" ? true : false}
      />
      <button 
      className="btn power-btn"
      name="power-btn"
      style={{color: power ? "#00d200" : "red"}}
      onClick={handelClick}
      >
          <FaPowerOff />
      </button>
    </div>
  );
}

export default SettingPad;
