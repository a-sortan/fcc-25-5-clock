import './SettingsBoard.css';

interface SettingsProps {
  sessionLength: number,
  breakLength: number,
  onLengthChange: any
}

function SettingsBoard({sessionLength, breakLength, onLengthChange}: SettingsProps) {                             
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