import './SettingsBoard.css';

interface SettingsProps {
  sessionLength: number,
  breakLength: number,
  onLengthChange: any,
  resetTimerLength: any
}

function SettingsBoard({sessionLength, breakLength, onLengthChange, resetTimerLength}: SettingsProps) {
  return (
    <div id="settings-board">
      <div className="item">
        <div className="length-control">
          <h2 id="session-label">Session Length</h2>
          <p>
            <button id="session-decrement" onClick={(e) => {onLengthChange(e.currentTarget.id)}}><i className="bi bi-arrow-down-square"></i></button>
            <span id="session-length">{sessionLength}</span>
            <button id="session-increment" onClick={(e) => {onLengthChange(e.currentTarget.id)}}><i className="bi bi-arrow-up-square"></i></button>
          </p>
        </div>
        <div className="length-control">
          <h2 id="break-label">Break Length</h2>
          <p>
            <button id="break-decrement" onClick={(e) => {onLengthChange(e.currentTarget.id)}}><i className="bi bi-arrow-down-square"></i></button>
            <span id="break-length">{breakLength}</span>
            <button id="break-increment"onClick={(e) => {onLengthChange(e.currentTarget.id)}}><i className="bi bi-arrow-up-square"></i></button>
          </p>
        </div>
      </div>
      <div className="item">
        <h2>Task</h2>

      </div>
      <button onClick={() => {resetTimerLength()}}><i className="bi bi-skip-start-btn"> Reset to default</i></button>
    </div>
  )
}

export default SettingsBoard