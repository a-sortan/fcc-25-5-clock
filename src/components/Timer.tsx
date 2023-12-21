import { useState, useEffect } from "react";
import "./Timer.css";

interface TimerControlProps {
  resetTimerLength: Function
}

export function TimerControl({resetTimerLength}:TimerControlProps) {
  return (
    <div>
      <button><i className="bi bi-play-btn"> Start</i></button>
      <button><i className="bi bi-pause-btn"> Pause</i></button>
      <button onClick={() => {resetTimerLength()}}><i className="bi bi-skip-start-btn"> Reset timer</i></button>
    </div>
  )
}

interface TimerProps {
  currentTimer: number,
  startingTimer: number,
  id: string,
  setTimerLength: any,
  toggleTimer: any,
  resetBoardToDefault: any
}

export function Timer({currentTimer, startingTimer, setTimerLength, toggleTimer, resetBoardToDefault}:TimerProps) {
  const [timerIsActive, setTimerActive] = useState<boolean>(false);

  let style = {
    backgroundImage: `linear-gradient(0deg, #49a078 0%, #49a078 ${currentTimer/startingTimer*100}%, transparent ${currentTimer/startingTimer*100+5}%)`
  }
  let lastPortionStyle = {
    backgroundImage: `linear-gradient(0deg, #A14A55 0%, #A14A55 ${currentTimer/startingTimer*100}%, transparent ${currentTimer/startingTimer*100+5}%)`
    
  }
  
  const startTimer = () => {
    console.log("start timer - currentTimer", currentTimer);
    setTimerActive(true);
  }

const pauseTimer = () => {
  console.log("pauseTimer - startingTimer", startTimer);
  setTimerActive(false);
}

useEffect (() => {
  let key: number | undefined;
  console.log("useEffect", timerIsActive )
  console.log(style)
  if(timerIsActive) {
    key = setInterval(() => {
      setTimerLength(currentTimer - 1)
    }, 1000);
  }
  if(currentTimer == 0 ) {
    let sound = (document.getElementById('beep') as HTMLAudioElement);
  console.log(sound);
  sound.play();
    toggleTimer();
    console.log("toggle")
  }
  return () => {
    clearInterval(key);
  }
},[timerIsActive, currentTimer])

const resetTimer = () => {
  let sound = (document.getElementById('beep') as HTMLAudioElement);
  sound.pause();
  sound.currentTime = 0;
  setTimerActive(false);
  resetBoardToDefault();
  // setTimerLength(startingTimer);
}

const toggleStartPause = () => {
  if(timerIsActive) {
    pauseTimer();
  } else {
    startTimer()
  }
}

  return (
    <>
      <div id="time-left" className="display-timer" style={currentTimer < Math.floor(startingTimer * 0.10 ) ? lastPortionStyle :style} >
        {Math.floor((currentTimer/60)).toString().padStart(2,'0')}:{(currentTimer%60).toString().padStart(2,'0')}
        {/* <span id="timerMinutes">{Math.floor(currentTimer/60)}</span>:
        <span id="timerSeconds">{(currentTimer%60).toString().padStart(2,'0')}</span> */}
      </div>
      <div>
        <audio id="beep" muted>
          <source src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav" type="audio/mpeg"/>
          Your browser does not support the audio element.
        </audio>
        <button id="start_stop" onClick={toggleStartPause}>
            <i className={timerIsActive ? "bi bi-pause-btn" : "bi bi-play-btn"}> {timerIsActive ? "Pause" : "Play"}</i>
        </button>
        <button id='reset' onClick={resetTimer}>
          <i className="bi bi-skip-start-btn"><span> Reset timer</span></i>
        </button>
      </div>
    </>
  )
}
