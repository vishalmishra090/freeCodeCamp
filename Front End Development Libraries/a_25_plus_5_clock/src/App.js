import {useState,useEffect,useRef} from 'react'
import LengthSetting from './components/LengthSetting';
import Header from './components/Header';
import Timer from './components/Timer'
import {FaPlay,FaPause,FaRedo} from 'react-icons/fa'

let initialValue = {
  breakLength: 5,
  sessionLength: 25,
  timerLabel: 'Session'
}

function App() {
  let [breakLength, setBreakLength] = useState(initialValue.breakLength)
  let [sessionLength, setSessionLength] = useState(initialValue.sessionLength)
  let [play,setPlay] = useState(false)
  let [timeLeft, setTimeLeft] = useState(initialValue.sessionLength * 60) // in sec
  let [timerLabel, setTimerLabel] = useState(initialValue.timerLabel)
  let [isReset, setIsReset] = useState(false)
  let audioElem = useRef()

  const handelBreakLength = (e) => {
    if(play) return
    const btn = e.currentTarget;

    if(/increment/g.test(btn.id) && 
        breakLength < 60){
      timerLabel === "Break" && setTimeLeft(breakLength * 60 + 60)
      setBreakLength((prevLength) => prevLength + 1);
    } 
     
    if(/decrement/g.test(btn.id) && 
    breakLength > 1){
      timerLabel === "Break" && setTimeLeft(breakLength * 60 - 60)
      setBreakLength((prevLength) => prevLength - 1);
    }
  }
  const handelSessionLength = (e) => {
    if(play) return
    const btn = e.currentTarget;
     
        if(/increment/g.test(btn.id) &&
        sessionLength < 60 ){
          timerLabel === "Session" && setTimeLeft(sessionLength * 60 + 60)
          setSessionLength((prevLength) => prevLength + 1);
        }

        if(/decrement/g.test(btn.id) && 
        sessionLength > 1){
          timerLabel === "Session" && setTimeLeft(sessionLength * 60 - 60)
          setSessionLength((prevLength) => prevLength - 1);
        }
  }

  const handelStartStop = () => {
    setPlay((prev) => !prev)
  }
  const handelReset = () => {
    setIsReset(true)
    setBreakLength(initialValue.breakLength)
    setSessionLength(initialValue.sessionLength)
    setPlay(false)
    setTimeLeft(initialValue.sessionLength * 60)
    setTimerLabel(initialValue.timerLabel)
  }

  useEffect(() => {
    if(isReset){
      audioElem.current.pause()
      audioElem.current.currentTime = 0
      setIsReset(false)
    }
    
    let startTime = Date.now() 
    let timerId = setInterval(() => {
       let currentTime = Date.now()
       if(timeLeft === 0 && audioElem.current.currentTime === 0){
         audioElem.current.play()
       }
       if(startTime + 1000 <= currentTime){
        if(timeLeft === 0){
          if(timerLabel === "Session"){
           setTimerLabel("Break")
           setTimeLeft(breakLength * 60)
          }
          if(timerLabel === "Break"){
            setTimerLabel("Session")
            setTimeLeft(sessionLength * 60)
          }
          
          clearInterval(timerId)
          return
        }
         if(timeLeft === 1) audioElem.current.currentTime = 0;
         let leapTime =  Math.round((currentTime - startTime) / 1000)
         setTimeLeft((prev) => leapTime >= prev ? 0 : prev - leapTime)
       }
    },50)

    if(!play) clearInterval(timerId)

    return () => {
      clearInterval(timerId)
    }
  },[play,timeLeft,isReset])

  return (
    <div className="App">
      <Header />
      <main className="app-container">
      <div className="setting-box">
          <LengthSetting label="Break" value={breakLength} onClick={handelBreakLength}/>
          <LengthSetting label="Session" value={sessionLength} onClick={handelSessionLength}/>
      </div>
      <div className="timer-box">
         <Timer 
            timeLeft = {timeLeft}
            timerLabel = {timerLabel}
         />
      </div>
      <div className="control-box">
          <button id="start_stop" 
          className="control-box-btn"
          onClick={handelStartStop}
          >
              {play ? <FaPause /> : <FaPlay />}
          </button>
          <button id="reset" 
          className="control-box-btn"
          onClick={handelReset}
          >
              <FaRedo />
          </button>
      </div>
      </main>
      <audio
          id="beep"
          preload="auto"
          ref={audioElem}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
    </div>
  );
}

export default App;
