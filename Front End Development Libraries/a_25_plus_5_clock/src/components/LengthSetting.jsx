import React from "react";
import {FaArrowUp,FaArrowDown} from 'react-icons/fa'

function LengthSetting({ label = "", value = 0, onClick }) {

 const handelClick = (e) => {
     onClick(e)
 }
  return (
    <div className="length-setting">


      <div className="length-setting-row length-setting-row1">
        <div 
          id={`${label.toLowerCase()}-label`} 
          className="length-setting-label"
          >
              {`${label} Length`}
        </div>
      </div>

      <div className="length-setting-row length-setting-row2">
      <button 
           id={`${label.toLowerCase()}-decrement`}
           className="length-setting-btn"
           onClick={handelClick}
        >
            <FaArrowDown />
        </button>
        <div 
          id={`${label.toLowerCase()}-length`}
          className="length-setting-value"
        >
            {value}
        </div>
        <button 
          id={`${label.toLowerCase()}-increment`}
          className="length-setting-btn"
          onClick={handelClick}
        >
            <FaArrowUp />
        </button>
      </div>

    </div>
  );
}

export default LengthSetting;
