import React from "react";

function Slider({
  onChange,
  sliderValue="50",
  power
}) {
 

  const handelChange = (e)=>{
     onChange(e)
  }
  return (
    <div className="slider">
      <div className="slider-box">
        <div className="slider-color-box">
         <span 
         className={`slider-color${power ?  "" : "  power-off"}`}
         style={{width: `calc(${sliderValue}% ${sliderValue > 35 ? "- 0.5rem" : "+ 1.5rem"})`}}
         >
         </span>
        </div>
        <div className="slider-btn-box">
        <span
        className="slider-btn"
        style={{left: `calc(${sliderValue}% - 1.5rem)`}}
        ></span>
        </div>
      </div>
      <input type="range" step="1" value={sliderValue} min="0" max="100" onChange={handelChange} className="slider-input"/>
    </div>
  );
}

export default Slider;
