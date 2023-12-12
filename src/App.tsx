import SettingsBoard from './components/SettingsBoard';
import './App.css'

function App() {
  
  return (
    <>
      <h1>25 + 5 Clock</h1>
      <SettingsBoard sessionLength={20} breakLength={10}/>
    </>
  )
}

export default App
