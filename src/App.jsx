import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti'

import './App.css'
import { nanoid } from "nanoid"


import Die from "./components/Die"

function App() {
  const [diceNums, setDiceNums] = useState(() => generateAllNewDice())
  const { width, height } = useWindowSize()
  const selectRef= useRef(null);


  function generateAllNewDice() {
    return new Array(10)
        .fill(0)
        .map(() => ({
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }))
  }

  function rollAgain() {
      setDiceNums(oldDice => 
        oldDice.map(die => 
            die.isHeld ?  die : {...die, value: Math.ceil(Math.random() * 6)} 
        )
      )
  }

  function holdDie(id) {
      setDiceNums(oldDice => {
          return (
            oldDice.map((die) => 
                die.id === id ? {...die, isHeld: !die.isHeld} : {...die}
            )
          )
      })
  }

  function resetGame() {
      setDice(generateAllNewDice())
  }
  // everytime setDiceNums runs (where diceNums state changes), the component code runs again
  // meaning this code re-runs and is calculated again
  const gameWon = diceNums.every((die)=> die.isHeld) 
                && diceNums.every((die)=> die.value == diceNums[0].value)
  useEffect(()=> {
    if (gameWon) { // if user won game, "New Game" button automatically becomes selected => good for accessibility
      selectRef.current.focus()
    }
  }, [gameWon]);
  return (
    <main>
      {gameWon ? <Confetti
      width={width}
      height={height}
      /> : null}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div id="dice-container">
        {diceNums.map((dieObj) => {
            return <Die 
              key={dieObj.id} 
              value={dieObj.value} 
              isHeld={dieObj.isHeld}
              holdDie={() => holdDie(dieObj.id)} // can pass this function i define that encases id also - one way to do it
              />
        })}
      </div>
    <button id="roll-btn" onClick={gameWon ? resetGame : rollAgain} ref={selectRef}>{gameWon ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App
