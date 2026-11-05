import './App.css'
import { Player } from './components/player'

function App() {
  const players = ["Player1","PlayerTwo","player3","PlayHer4","Player 5","Łukasz"]
  /*
  for(var i = 1;i<=100;i++){
    players.push("Bot"+i)
  }
  */

  return (
    <>
      <h1>Score Keeper</h1>
      <ul>
        {players.map(p => <Player playerName={p} />)}
      </ul>
    </>
  )
}

export default App
