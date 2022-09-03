import React from 'react'
import Grid from './components/Grid'
import Keyboard from './components/Keyboard'
import Confetti from 'react-confetti'
let randomWord = require('random-words')
let solutionWord

const keyLetters = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<<']

function App() {

  const [boxes, setBoxes] = React.useState(allNewBoxes())
  const [keys, setKeys] = React.useState(allNewKeys())
  const [wordleWin, setWordleWin] = React.useState(false)
  const [gameOver, setGameOver] = React.useState(false)

  React.useEffect(() => {
    solutionWord = randomWord({exactly: 1, maxLength: 5})
    // make sure random word is exactly 5 letters (i wish you can specify length in function)
    while (solutionWord[0].length !== 5) {
      solutionWord = randomWord({exactly: 1, maxLength: 5})
    }
    solutionWord = 'trash'
    solutionWord = solutionWord.toString()
  }, [])

  function allNewBoxes() {
    const array = []
    let idIndex = 0
    for (let i = 0; i < 6; i++) {
      array[i] = []
      for (let j = 0; j < 5; j++) {
        array[i].push({
          id: idIndex,
          letter: '',
          correctPlace: 'blank'
        })
        idIndex = idIndex + 1
      }
    }
    return array
  }

  function allNewKeys() {
    const array = []
    for (let i = 0; i < 28; i++) {
        array.push({
            id: i,
            letter: keyLetters[i],
            correctPlace: 'blank'    // probably change all of placement into '0' - blank ; '1' - no and so on for easier sorting and placement
        })
    }
    return array
  }


  function colorKeyboard(info) {
    for (let i = 0; i < info.length; i++) {
      setKeys(prevKeys => prevKeys.map(key => {
        if (key.letter === info[i].letter.toUpperCase()) {
          // making sure keyboard letters stay at highest possible color order 
          // no matter what, change key color (once gray (no) it cannot go lower)
          if (key.correctPlace === 'blank' || key.correctPlace === 'no') {
            return {...key, correctPlace: info[i].placementColor}
          }
          // if yellow (almost), and new color is green (yes) change to green
          if (key.correctPlace === 'almost' && info[i].placementColor === 'yes') {
            return {...key, correctPlace: info[i].placementColor}
          }
          // if new color is green (yes) change to green
          if (info[i].placementColor === 'yes') {
            return {...key, correctPlace: info[i].placementColor}
          }
        }
        return key
      }))
    }
  }

  function isGameOver(inputWord, guessRow) {
    if (solutionWord === inputWord) {
      setWordleWin(true)
      setGameOver(true)
      console.log('game over you win!')
      console.log('solution: ' + solutionWord)
    }
    else if (guessRow > 6) { // problem: input last word in last row, ends automatically
      setGameOver(true)                 // problem: as boxes are flipping, you are still able to type next word. DONT DO THAT
      console.log('game over you lose') // problem: confetti falls too early
      console.log('solition: ' + solutionWord)
    }
  }

  // need access to function in child component (Grid). Not entirely great practice.
  // could have that function in this component but it seems out of place and cluttered
  const childRef = React.useRef()
  const keyboardClicked = (keyLetter) => {
    childRef.current.keyboardClicked(keyLetter)
  }


  return (
    <main className='main-container'>
      {wordleWin && <Confetti />} 
      <h1 className='title'>Wordle</h1>
      <Grid boxes={boxes} setBoxes={setBoxes} solutionWord={solutionWord} colorKeyboard={colorKeyboard} ref={childRef} isGameOver={isGameOver} gameOver={gameOver}/>
      <Keyboard keys={keys} setKeys={setKeys} keyboardClicked={keyboardClicked}/>
    </main>
  )
}

export default App
