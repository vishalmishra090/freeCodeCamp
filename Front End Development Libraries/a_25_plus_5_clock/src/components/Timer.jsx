import React from 'react'

function Timer({
    timeLeft = '1500',
    timerLabel = 'Session'
}) {

    let styles = {
        color: timeLeft < 60 ? "red" : "white",
        borderColor: timeLeft < 60 ? "red" : "#1f93ff"
    }
    return (
        <div className="timer" style={styles}>
            <div id="timer-label" className="timer-label">
                {timerLabel}
            </div>
            <div id="time-left" className="timer-value">
                 {ssToMMSS(timeLeft)}
            </div>
        </div>
    )
}

export default Timer


function ssToMMSS(timeInSec){
    let mm = Number.parseInt(timeInSec / 60)
    let ss = timeInSec % 60
    
    if(mm < 10) mm = "0" + mm
    if(ss < 10) ss = "0" + ss

    return mm + ":" + ss
}
