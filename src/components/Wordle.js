import React from "react";
import Navbar from "./Navbar";
import Grid from "./Grid";
import Keyboard from "./Keyboard";
import PopupDisplays from "./PopupDisplays";
import Results from "./Results";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
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
  const { auth } = useAuth();

  const [boxes, setBoxes] = React.useState(allNewBoxes());
  const [keys, setKeys] = React.useState(allNewKeys());
  const [wordleWin, setWordleWin] = React.useState(false);
  const [gameOver, setGameOver] = React.useState(false);
  const [wordExists, setWordExists] = React.useState(true);

  const [seconds, setSeconds] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);

  // getting new solution word
  React.useEffect(() => {
    if (!gameOver) {
      solutionWord = randomWord({ exactly: 1, maxLength: 5 });
      // make sure random word is exactly 5 letters (i wish you can specify length in function)
      while (solutionWord[0].length !== 5) {
        solutionWord = randomWord({ exactly: 1, maxLength: 5 });
      }
      solutionWord = solutionWord.toString();
    }
  }, [gameOver]);

  // for timer
  React.useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      console.log("CLEARING");
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

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

  const handleGameOver = (userHasWon) => {
    if (userHasWon) {
      setWordleWin(true);
    }
    setSeconds(0); // resetting timer
    setIsActive(false); // de-activating timer
    setGameOver(true);
  };

  const isGameOver = async (inputWord, guessRow) => {
    let user = JSON.stringify(auth?.user);
    console.log(user);
    if (solutionWord === inputWord) {
      const time = seconds;
      const win = true;
      const loss = false;
      // update stats for user if won
      try {
        const response = await axios.put(
          "/update",
          JSON.stringify({ user, win, loss, guessRow, time }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(JSON.stringify(response?.data));
        handleGameOver(true);
      } catch (err) {
        console.error(err);
      }
    } else if (guessRow >= 6) {
      const time = seconds;
      const win = false;
      const loss = true;
      // update stats for user if lost
      try {
        const response = await axios.put(
          "/update",
          JSON.stringify({ user, win, loss, guessRow, time }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(JSON.stringify(response?.data));
        handleGameOver(false);
      } catch (err) {
        console.error(err);
      }
    }
  };

  // need access to function in child component (Grid).
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
          setIsActive={setIsActive}
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
      {gameOver && <Results playAgain={playAgain} gameOver={gameOver} />}
    </main>
  );
}

export default MainContent;
