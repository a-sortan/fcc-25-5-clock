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
  toggleTimer: any
}

export function Timer({currentTimer, startingTimer, setTimerLength, toggleTimer}:TimerProps) {
  const [timerIsActive, setTimerActive] = useState<boolean>(false);

  let style = {
    backgroundImage: `linear-gradient(0deg, green 0%, green ${currentTimer/startingTimer*100}%, transparent ${currentTimer/startingTimer*100+5}%)`
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
  if(currentTimer == 0 ) {
    toggleTimer();
    console.log("toggle")
  } else if(timerIsActive) {
    key = setInterval(() => {
      setTimerLength(currentTimer - 1)
    }, 1000);
  }
 
  return () => {
    clearInterval(key);
  }
},[timerIsActive, currentTimer])

const resetTimer = () => {
  console.log("reset timer")
  setTimerActive(false);
  setTimerLength(startingTimer);
}

  return (
    <>
      <div id="time-left" className="display-timer" style={style} >
        {Math.floor((currentTimer/60)).toString().padStart(2,'0')}:{(currentTimer%60).toString().padStart(2,'0')}
        {/* <span id="timerMinutes">{Math.floor(currentTimer/60)}</span>:
        <span id="timerSeconds">{(currentTimer%60).toString().padStart(2,'0')}</span> */}
      </div>
      <div>
        <button onClick={startTimer}><i className="bi bi-play-btn"> Start</i></button>
        <button onClick={pauseTimer}><i className="bi bi-pause-btn"> Pause</i></button>
        <button id='reset' onClick={resetTimer}><i className="bi bi-skip-start-btn"> Reset timer</i></button>
      </div>
    </>
  )
}
