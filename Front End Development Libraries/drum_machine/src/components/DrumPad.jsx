import React, {useEffect} from 'react'
import {KitDrum,KitPiano}  from '../kit'

function DrumPad({
    onPlay,
    power=true,
    kit="",
    loading
}) {
   
    function focusKey(id){
        document.getElementById(id).classList.toggle("drum-pad-key-active")
        setTimeout(() => {
          document.getElementById(id).classList.toggle("drum-pad-key-active")
        },100)
      }
    function playAudio(e){
       kit === "Drum" && KitDrum.forEach((audio) => {
        if(e.keyCode === audio.keyCode || e.target.id === audio.id){
            focusKey(audio.id)
            let audioElem = document.getElementById(audio.keyTrigger)
            audioElem.currentTime = 0;
            !loading && power && audioElem.play()
            onPlay(audio)
            return
        }
       });

       kit === "Piano" && KitPiano.forEach((audio) => {
        if(e.keyCode === audio.keyCode || e.target.id === audio.id){
            focusKey(audio.id)
            let audioElem = document.getElementById(audio.keyTrigger)
            audioElem.currentTime = 0;
            !loading && power && audioElem.play()
            onPlay(audio)
            return
        }
       });
    }

    const handelClick = (e) => {
        if([...e.target.classList].includes("drum-pad")) 
             playAudio(e)
    }
    
    useEffect(() => {
        
        function handelKeyPressForDrumPad(e){
            playAudio(e)
        }
        document.addEventListener("keydown",handelKeyPressForDrumPad)

        return () => {
            document.removeEventListener("keydown",handelKeyPressForDrumPad)
        }
    },[kit,power,loading])
    return (
        <div 
        id="drum-pad" 
        onClick={handelClick}
        >
            {
                kit === "Drum" 
                ?
                KitDrum.map((audio,i) => (
                  <DrumPadKey 
                    key={i}
                    power={power}
                    audio={audio} 
                  />

                ))
                :
                KitPiano.map((audio,i) => (
                    <DrumPadKey 
                    key={i}
                    power={power}
                    audio={audio} 
                  />
                ))
            }
        </div>
    )
}

function DrumPadKey({
    audio={},
    power
}){
    return(
        <div 
        className={`btn drum-pad drum-pad-key${power ? "" : " power-off"}`}
        id={audio.id}
        >
          <audio className="clip" src={audio.url} id={audio.keyTrigger}/>

            {audio.keyTrigger}
        </div>
    )
}

export default DrumPad
