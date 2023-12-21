import { useState } from "react";
import SettingsBoard from "./SettingsBoard"
import { Timer }  from "./Timer";

type TimerLabel = "Session" | "Break";

const DEF_SESSION_LENGTH = 25 * 60;
const DEF_BREAK_LENGTH = 5 * 60;

function Board() {
  
  const [sessionLength, setSessionLength] = useState<number>(DEF_SESSION_LENGTH);
  const [breakLength, setBreakLength] = useState<number>(DEF_BREAK_LENGTH);
  const [timerLabel, setTimerLabel] = useState<TimerLabel>("Session");
  const [currentTimeLength, setTimerLength] = useState<number>(DEF_SESSION_LENGTH);
  
  const resetTimerToDefault = () => {
    console.log("resetTimerToDefault")
    let currentTimeLength = timerLabel == "Session" ? DEF_SESSION_LENGTH : DEF_BREAK_LENGTH;
    setTimerLength(currentTimeLength);
    setSessionLength(DEF_SESSION_LENGTH);
    setBreakLength(DEF_BREAK_LENGTH);
  }

  const resetBoardToDefault = () => {
    console.log("resetBoardToDefault")
    setTimerLabel("Session");
    setTimerLength(DEF_SESSION_LENGTH);
    setSessionLength(DEF_SESSION_LENGTH);
    setBreakLength(DEF_BREAK_LENGTH);
  }

  const toggleTimer = () => {
    let t:TimerLabel  = timerLabel == "Session" ? "Break" : "Session";
    let currentTimer = t == "Session" ? sessionLength : breakLength;
    setTimerLabel(t);
    setTimerLength(currentTimer);
  }

  const onLengthChange = (id: string) => {
    switch(id) {
      case "session-decrement":
        if(sessionLength > 60) {
          let sd = sessionLength - 60;
          setSessionLength(sd);
          if (timerLabel == "Session") setTimerLength(sd);
        }
        break;
      case "session-increment":
        if(sessionLength < 60*60) {
          let si = sessionLength + 60;
          if (timerLabel == "Session") setTimerLength(si);
          setSessionLength(si);
        }
        break;
      case "break-decrement":
        if(breakLength > 60) {
          let bd = breakLength - 60;
          setBreakLength(bd);
          if (timerLabel == "Break") setTimerLength(bd);
        }
        break;
      case "break-increment":
        if(breakLength < 60*60) {
          let bi = breakLength + 60;
          setBreakLength(bi);
          if (timerLabel == "Break") setTimerLength(bi);
        }
        break;
      default:
        console.log("error");
        break;
    }
  }

  return (
    <div id="board">
      <SettingsBoard 
        sessionLength={sessionLength} 
        breakLength={breakLength} 
        onLengthChange={onLengthChange} 
        resetTimerLengthToDefault={resetTimerToDefault} 
      />
      <h1 id="timer-label">{timerLabel}</h1>
      <button onClick={toggleTimer}><i className="bi bi-arrow-repeat"> Switch</i> </button>
      <Timer 
        id="timerInterval" 
        currentTimer={currentTimeLength}
        startingTimer={timerLabel == "Session" ? sessionLength : breakLength}
        setTimerLength={setTimerLength}
        toggleTimer={toggleTimer}
        resetBoardToDefault={resetBoardToDefault} 
      />
    </div>
  )
}

export default Board;