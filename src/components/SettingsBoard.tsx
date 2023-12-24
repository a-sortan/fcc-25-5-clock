import './SettingsBoard.css';

interface SettingsProps {
  sessionLength: number,
  breakLength: number,
  setSessionLength: any,
  setBreakLength: any,
  getCurrentTimeLabel: any,
  setTimerLength: any
}

function SettingsBoard({sessionLength, breakLength, setSessionLength, setBreakLength, getCurrentTimeLabel, setTimerLength}: SettingsProps) {
  const onLengthChange = (id: string) => {
    switch(id) {
      case "session-decrement":
        if(sessionLength > 60) {
          let sd = sessionLength - 60;
          setSessionLength(sd);
          if (getCurrentTimeLabel() == "Session") setTimerLength(sd);
        }
        break;
      case "session-increment":
        if(sessionLength < 60*60) {
          let si = sessionLength + 60;
          if (getCurrentTimeLabel() == "Session") setTimerLength(si);
          setSessionLength(si);
        }
        break;
      case "break-decrement":
        if(breakLength > 60) {
          let bd = breakLength - 60;
          setBreakLength(bd);
          if (getCurrentTimeLabel() == "Break") setTimerLength(bd);
        }
        break;
      case "break-increment":
        if(breakLength < 60*60) {
          let bi = breakLength + 60;
          setBreakLength(bi);
          if (getCurrentTimeLabel() == "Break") setTimerLength(bi);
        }
        break;
      default:
        console.log("error");
        break;
    }
  }                             
  return (
    <div id="settings-board">
      <div className="item">
        <div className="length-control">
          <h2 id="session-label">Session Length</h2>
          <p>
            <button id="session-decrement" onClick={(e) => {onLengthChange(e.currentTarget.id)}}>
              <i className="bi bi-arrow-down-square"></i>
            </button>
            <div id="session-length">{Math.floor(sessionLength / 60)}</div>
            <button id="session-increment" onClick={(e) => {onLengthChange(e.currentTarget.id)}}>
              <i className="bi bi-arrow-up-square"></i>
            </button>
          </p>
        </div>
        <div className="length-control">
          <h2 id="break-label">Break Length</h2>
          <p>
            <button id="break-decrement" onClick={(e) => {onLengthChange(e.currentTarget.id)}}>
              <i className="bi bi-arrow-down-square"></i>
            </button>
            <div id="break-length">{Math.floor(breakLength / 60)}</div>
            <button id="break-increment"onClick={(e) => {onLengthChange(e.currentTarget.id)}}>
              <i className="bi bi-arrow-up-square"></i>
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SettingsBoard