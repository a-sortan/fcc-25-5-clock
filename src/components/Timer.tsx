
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
  currentTimer:number,
  id: string
}

export function Timer({currentTimer}:TimerProps) {
  return (
    <div className="display-timer">
      <span id="timerMinutes">{Math.floor(currentTimer/60)}</span>:<span id="timerSeconds">{(currentTimer%60).toString().padStart(2,'0')}</span>
    </div>
  )
}
