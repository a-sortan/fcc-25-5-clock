import { useState, useEffect } from "react";
import SettingsBoard from "./SettingsBoard"
import { Timer, TimerControl }  from "./Timer";

type TimerLabel = "Session" | "Break";
const DEF_SESSION_LENGTH = 25;
const DEF_BREAK_LENGTH = 5;

function Board() {
  const minutesToSeconds = (mins:number) => {
    return mins * 60;
  }
  const [sessionLength, setSessionLength] = useState<number>(DEF_SESSION_LENGTH);
  const [breakLength, setBreakLength] = useState<number>(DEF_BREAK_LENGTH);
  const [timerLabel, setTimerLabel] = useState<TimerLabel>("Session");
  const [currentTimer, setTimer] = useState<number>(minutesToSeconds(DEF_SESSION_LENGTH));
  const [timerIsActive, setTimerActive] = useState<boolean>(false);
  
  const resetTimerToDefault = () => {
    console.log("reset")
    let currentTimer = timerLabel == "Session" ? DEF_SESSION_LENGTH : DEF_BREAK_LENGTH;
    setTimer(minutesToSeconds(currentTimer));
    setSessionLength(DEF_SESSION_LENGTH);
    setBreakLength(DEF_BREAK_LENGTH);
  }

  const resetTimer = () => {
    console.log("reset timer")
    let currentTimer = timerLabel == "Session" ? sessionLength : breakLength;
    console.log("current timer", currentTimer, timerLabel);
    setTimerActive(false);
    setTimer(minutesToSeconds(currentTimer));

  }

  const toggleTimer = () => {
    let t:TimerLabel  = timerLabel == "Session" ? "Break" : "Session";
    let currentTimer = t == "Session" ? sessionLength : breakLength;
    setTimerLabel(t);
    setTimer(minutesToSeconds(currentTimer));
  }

  const onLengthChange = (id: string) => {
    switch(id) {
      case "session-decrement":
        if(sessionLength > 0) setSessionLength(sessionLength-1);
        if (timerLabel == "Session") setTimer(minutesToSeconds(sessionLength));
        break;
      case "session-increment":
        setSessionLength(sessionLength+1);
        if (timerLabel == "Session") setTimer(minutesToSeconds(sessionLength));
        break;
      case "break-decrement":
        if(breakLength > 0) setBreakLength(breakLength-1);
        if (timerLabel == "Break") setTimer(minutesToSeconds(breakLength));
        break;
      case "break-increment":
        setBreakLength(breakLength+1);
        if (timerLabel == "Break") setTimer(minutesToSeconds(breakLength));
        break;
      default:
        console.log("error");
        break;
    }
  }

  const startTimer = () => {
    console.log("start timer");
    setTimerActive(true);
  }

  const pauseTimer = () => {
    console.log("pause timer");
    setTimerActive(false);
  }

  useEffect (() => {
    let key: number | undefined;
    console.log("useEffect", timerIsActive)
    if(currentTimer == 0 ) {
      toggleTimer();
    } else if(timerIsActive) {
      key = setInterval(() => {
        setTimer(currentTimer => currentTimer - 1)
      }, 1000);
    }
   
    return () => {
      clearInterval(key);
    }
  })

  return (
    <div>
      <SettingsBoard 
        sessionLength={sessionLength} 
        breakLength={breakLength} 
        onLengthChange={onLengthChange} 
        resetTimerLength={resetTimerToDefault}  
      />
      <h2 id="timer-label">{timerLabel}</h2>
      <button onClick={toggleTimer}>Switch </button>
      {/* <button onClick={pauseTimer}>pause tine</button>
      <button onClick={resetTimer}>clear tine</button> */}
      <Timer id="timerInterval" currentTimer={currentTimer} />
      <div>
        <button onClick={startTimer}><i className="bi bi-play-btn"> Start</i></button>
        <button onClick={() => {pauseTimer()}}><i className="bi bi-pause-btn"> Pause</i></button>
        <button onClick={() => {resetTimer()}}><i className="bi bi-skip-start-btn"> Reset timer</i></button>
      </div>
      {/* <TimerControl resetTimerLength={resetTimer}/> */}
    </div>
  )
}

export default Board;