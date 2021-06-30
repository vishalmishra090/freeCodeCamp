import React from "react";

function Display({ 
    displayText = "",
    vol="100",
    kit="Drum",
    power=true
}) {
  return (
    <div id="display" className="display">
      <div className="display-text">
          <div 
          className="display-text-row"
          >
          <div 
          className="display-text-col1"
          style={{display: power ? "flex" : "none"}}
          >
              <div className="display-volume">
                  <span>Vol</span>
                  <span>{vol}</span>
              </div>
              <div className="display-kit">
                  <span>Kit</span>
                  <span>{kit}</span>
              </div>
          </div>
          <div 
          className="display-text-col2"
          style={{display: power ? "block" : "none"}}
          >
              {displayText}
          </div>
          </div>
      </div>
    </div>
  );
}

export default Display;
