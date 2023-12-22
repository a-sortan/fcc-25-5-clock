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

  let bckStyle = {
    backgroundImage: `linear-gradient(0deg, rgb(73, 160, 120) 0%, 
                                            rgb(73, 160, 120) ${currentTimer/startingTimer*100}%,
                                            transparent ${currentTimer/startingTimer*100+5}%)`
  }
  let lastPortionBckStyle = {
    backgroundImage: `linear-gradient(0deg, rgb(161, 74, 85) 0%, 
                                            rgb(161, 74, 85) ${currentTimer/startingTimer*100}%, 
                                            transparent ${currentTimer/startingTimer*100+5}%)`
    
  }
  
  const startTimer = () => {
    setTimerActive(true);
  }

const pauseTimer = () => {
  setTimerActive(false);
}

useEffect (() => {
  let key: number | undefined;
  if(timerIsActive) {
    key = setInterval(() => {
      setTimerLength(currentTimer - 1)
    }, 1000);
  }
  if(currentTimer == 0 ) {
    let sound = (document.getElementById('beep') as HTMLAudioElement);
    sound.play();
    toggleTimer();
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
      <div id="time-left" className="display-timer" style={currentTimer < 30 ? lastPortionBckStyle : bckStyle} >
        {Math.floor((currentTimer/60)).toString().padStart(2,'0')}:{(currentTimer%60).toString().padStart(2,'0')}
      </div>
      <div>
        <audio id="beep" muted>
          <source src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav" type="audio/mpeg"/>
          Your browser does not support the audio element.
        </audio>
        <button id="start_stop" onClick={toggleStartPause}>
            <i className={timerIsActive ? "bi bi-pause-btn" : "bi bi-play-btn"}> {timerIsActive ? "Pause" : "Start"}</i>
        </button>
        <button id='reset' onClick={resetTimer}>
          <i className="bi bi-skip-start-btn"><span> Reset timer</span></i>
        </button>
      </div>
    </>
  )
}
