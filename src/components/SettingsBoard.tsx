import './SettingsBoard.css';

interface SettingsProps {
  sessionLength: number,
  breakLength: number
}
function SettingsBoard(props: SettingsProps) {
  return (
    <div>
      <div className="item">
        <div className="length-control">
          <h2>Session Length</h2>
          <p>{props.sessionLength}</p>
        </div>
        <div className="length-control">
          <h2>Break Length</h2>
          <p>{props.breakLength}</p>
        </div>
      </div>
      <div className="item">
        <h2>Task</h2>

      </div>
    </div>
  )
}

SettingsBoard.defaultProps = {
  sessionLength: 25,
  breakLength: 5
}



export default SettingsBoard