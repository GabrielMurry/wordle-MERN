import React from "react";
import Navbar from "./Navbar";
import Grid from "./Grid";
import Keyboard from "./Keyboard";
import PopupDisplays from "./PopupDisplays";
import Results from "./Results";
import "../styles/wordleStyles.css";
let randomWord = require("random-words");
let solutionWord;

const keyLetters = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "ENTER",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "<<",
];

function MainContent() {
  const [boxes, setBoxes] = React.useState(allNewBoxes());
  const [keys, setKeys] = React.useState(allNewKeys());
  const [wordleWin, setWordleWin] = React.useState(false);
  const [gameOver, setGameOver] = React.useState(false);
  const [wordExists, setWordExists] = React.useState(true);

  React.useEffect(() => {
    solutionWord = randomWord({ exactly: 1, maxLength: 5 });
    // make sure random word is exactly 5 letters (i wish you can specify length in function)
    while (solutionWord[0].length !== 5) {
      solutionWord = randomWord({ exactly: 1, maxLength: 5 });
    }
    console.log("solution word: " + solutionWord);
    solutionWord = solutionWord.toString();
  }, [gameOver]);

  function allNewBoxes() {
    const array = [];
    let idIndex = 0;
    for (let i = 0; i < 6; i++) {
      array[i] = [];
      for (let j = 0; j < 5; j++) {
        array[i].push({
          id: idIndex,
          letter: "",
          correctPlace: "blank",
        });
        idIndex = idIndex + 1;
      }
    }
    return array;
  }

  function allNewKeys() {
    const array = [];
    for (let i = 0; i < 28; i++) {
      array.push({
        id: i,
        letter: keyLetters[i],
        correctPlace: "blank", // probably change all of placement into '0' - blank ; '1' - no and so on for easier sorting and placement
      });
    }
    return array;
  }

  function colorKeyboard(info) {
    for (let i = 0; i < info.length; i++) {
      setKeys((prevKeys) =>
        prevKeys.map((key) => {
          if (key.letter === info[i].letter.toUpperCase()) {
            // making sure keyboard letters stay at highest possible color order
            // no matter what, change key color (once gray (no) it cannot go lower)
            if (key.correctPlace === "blank" || key.correctPlace === "no") {
              return { ...key, correctPlace: info[i].placementColor };
            }
            // if yellow (almost), and new color is green (yes) change to green
            if (
              key.correctPlace === "almost" &&
              info[i].placementColor === "yes"
            ) {
              return { ...key, correctPlace: info[i].placementColor };
            }
            // if new color is green (yes) change to green
            if (info[i].placementColor === "yes") {
              return { ...key, correctPlace: info[i].placementColor };
            }
          }
          return key;
        })
      );
    }
  }

  function isGameOver(inputWord, guessRow) {
    if (solutionWord === inputWord) {
      setWordleWin(true);
      setGameOver(true);
      console.log("game over you win!");
      console.log("solution: " + solutionWord);
    } else if (guessRow >= 6) {
      // problem: when displaying word does not exist, delete display when you press backspace
      setGameOver(true); // problem: add stats.
      console.log("game over you lose");
      console.log("solition: " + solutionWord); // problem: if you close computer for a while in middle of playing a game, i think it reloads a new word. keep solution in local storage?
    } // problem: solution is paper. I put caper, p should be green, but is yellow instead
  }

  // need access to function in child component (Grid). Not entirely great practice.
  // could have that function in this component but it seems out of place and cluttered
  const childRef = React.useRef();
  const keyboardClicked = (keyLetter) => {
    childRef.current.keyboardClicked(keyLetter);
  };

  function playAgain() {
    setBoxes(allNewBoxes());
    setKeys(allNewKeys());
    setWordleWin(false);
    setGameOver(false);
    setWordExists(true);
    childRef.current.newGame();
  }

  const styleOpacityChange = {
    opacity: gameOver ? "0.3" : "1",
    transition: gameOver ? "opacity 1s 2.5s" : "none",
  };

  return (
    <main className="main-container">
      <Navbar />
      <div className="game-section" style={styleOpacityChange}>
        <Grid
          boxes={boxes}
          setBoxes={setBoxes}
          solutionWord={solutionWord}
          colorKeyboard={colorKeyboard}
          ref={childRef}
          setWordExists={setWordExists}
          isGameOver={isGameOver}
          gameOver={gameOver}
        />
        <Keyboard
          keys={keys}
          setKeys={setKeys}
          keyboardClicked={keyboardClicked}
        />
        <PopupDisplays
          gameOver={gameOver}
          wordleWin={wordleWin}
          wordExists={wordExists}
          solutionWord={solutionWord}
        />
      </div>
      {gameOver && <Results playAgain={playAgain} />}
    </main>
  );
}

export default MainContent;
