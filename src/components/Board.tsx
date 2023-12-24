import { useState } from "react";
import SettingsBoard from "./SettingsBoard"
import { Timer }  from "./Timer";
import './Board.css';

type TimerLabel = "Session" | "Break";

const DEF_SESSION_LENGTH = 25 * 60;
const DEF_BREAK_LENGTH = 5 * 60;

function Board() {
  
  const [sessionLength, setSessionLength] = useState<number>(DEF_SESSION_LENGTH);
  const [breakLength, setBreakLength] = useState<number>(DEF_BREAK_LENGTH);
  const [currentTimeLabel, setTimerLabel] = useState<TimerLabel>("Session");
  const [currentTimeLength, setTimerLength] = useState<number>(DEF_SESSION_LENGTH);

  const resetBoardToDefault = () => {
    setTimerLabel("Session");
    setTimerLength(DEF_SESSION_LENGTH);
    setSessionLength(DEF_SESSION_LENGTH);
    setBreakLength(DEF_BREAK_LENGTH);
  }

  const toggleTimer = () => {
    let t:TimerLabel  = currentTimeLabel == "Session" ? "Break" : "Session";
    let currentTimer = t == "Session" ? sessionLength : breakLength;
    setTimerLabel(t);
    setTimerLength(currentTimer);
  }

  const getCurrentTimeLabel = () => {
    return currentTimeLabel;
  }

  return (
    <div id="board">
      <SettingsBoard 
        sessionLength={sessionLength} 
        breakLength={breakLength}
        setSessionLength={setSessionLength}
        setBreakLength={setBreakLength}
        getCurrentTimeLabel={getCurrentTimeLabel}
        setTimerLength={setTimerLength}
      />
      <div className="timer-display">
        <h2 id="timer-label">{currentTimeLabel}</h2>
        <button onClick={toggleTimer}><i className="bi bi-arrow-repeat"> Switch</i> </button>
        <Timer 
          id="timerInterval" 
          currentTimer={currentTimeLength}
          startingTimer={currentTimeLabel == "Session" ? sessionLength : breakLength}
          setTimerLength={setTimerLength}
          toggleTimer={toggleTimer}
          resetBoardToDefault={resetBoardToDefault} 
        />
      </div>
    </div>
  )
}

export default Board;