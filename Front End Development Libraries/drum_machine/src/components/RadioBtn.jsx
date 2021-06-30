import React from 'react'

function RadioBtn({
  id=null,
  name="",
  value="",
  checked,
  onCheck= ()=>{},
  power
}) {

   const handelChange = (e) => {
     onCheck(e)
   }
    return (
        <div className="radio">
          <input id={id} type="radio"  name={name} value={value} className="radio-input"
          onChange={handelChange}
          checked={checked}
          />
          <label htmlFor={id} className={`radio-label${power ? "" : " power-off"}`}></label>
        </div>
    )
}

export default RadioBtn
