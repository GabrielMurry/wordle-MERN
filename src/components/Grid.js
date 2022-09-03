import React from 'react'
import Box from './Box'
const wordExists = require('word-exists')

const Grid = React.forwardRef((props, ref) => {

    const [row, setRow] = React.useState(1)
    const [inputLetters, setInputLetters] = React.useState([])
    const [paralysis, setParalysis] = React.useState(false)

    React.useEffect(() => {

        // // if game over, prevent any more inputs
        // // or paralysis - prevents user from typing next word as previous rows' colors revealing
        props.gameOver || paralysis 
        ? document.removeEventListener('keydown', keyDownHandler) 
        : document.addEventListener('keydown', keyDownHandler)

        return () => {
          document.removeEventListener('keydown', keyDownHandler)
        }
    }, [inputLetters, row, props.gameOver, paralysis])


    React.useImperativeHandle(ref, () => ({
        keyboardClicked(keyLetter) {
            // if game over or paralysis, prevent any more keyboard click inputs
            (!props.gameOver && !paralysis) && keyDownHandler(keyLetter)
        }
    }))
    // pressing key on keyboard and inputting letter into wordle grid (handles enter and backspace)
    const keyDownHandler = (event) => {
        if (event.key.match(/[a-z]/) && event.key.length === 1 && inputLetters.length < 5*row) {
            // setBoxes to add letter for displaying on screen
            props.setBoxes(prevBoxes => prevBoxes.map(boxRows => {
                return (boxRows.map(box => {
                    return box.id === inputLetters.length ? {...box, letter: event.key.toUpperCase()} : box
                }))
            }))
            // setInputLetters to build mini array of letters to easily configure into word
            setInputLetters(prevArray => [...prevArray, event.key.toUpperCase()])
        }
        else if ((event.key === 'Backspace' || event.key === '<<') && inputLetters.length > (row-1)*5) {
            props.setBoxes(prevBoxes => prevBoxes.map(boxRows => {
                return (boxRows.map(box => {
                    return box.id === inputLetters.length - 1 ? {...box, letter: ''} : box
                }))
            }))
            setInputLetters(prevArray => prevArray.slice(0, -1))
        }
        else if ((event.key === 'Enter' || event.key === 'enter') && inputLetters.length === 5*row) {
            const word = inputLetters.slice(-5).join('').toLowerCase()
            console.log('You entered: ' + word)
            if (doesWordExist(word)) {
                props.setWordExists(true)
                setRow(prevRow => prevRow + 1)
                compareToSolution(word)
            }
            else {
                props.setWordExists(false)
            }
        }
    }

    const doesWordExist = (word) => {
        return wordExists(word)
    }

    const compareToSolution = (word) => {
        const solutionWord = props.solutionWord
        const solutionArray = []
        for (let i = 0; i < solutionWord.length; i++) {
            solutionArray.push({
            isTaken: false,
            matchedPieceIndex: -1
            })
        }
        const comparisonArray = []
        for (let i = 0; i < word.length; i++) {
            for (let j = 0; j < solutionWord.length; j++) {
                if (!solutionArray[j].isTaken && word[i] === solutionWord[j] && i === j) {
                    comparisonArray.push('yes')
                    solutionArray[j].isTaken = true
                    solutionArray[j].matchedPieceIndex = i
                    break
                }
                else if (!solutionArray[j].isTaken && word[i] === solutionWord[j] && i !== j) {
                    comparisonArray.push('almost')
                    solutionArray[j].isTaken = true
                    solutionArray[j].matchedPieceIndex = i
                    break
                }
                else if (solutionArray[j].isTaken && word[i] === solutionWord[j] && i === j) {
                    comparisonArray[solutionArray[j].matchedPieceIndex] = 'no'
                    comparisonArray.push('yes')
                    solutionArray[j].isTaken = true
                    solutionArray[j].matchedPieceIndex = i
                    break
                }
                else if (word[i] !== solutionWord[j] && j === solutionWord.length - 1) {
                    comparisonArray.push('no')
                }
            }
        }
        flipTile(comparisonArray, word)
    }

    const flipTile = (comparisonArray, word) => {
        const guessRowStartIndex = inputLetters.length - 5
        setParalysis(true)
        comparisonArray.forEach((placement, index) => {
            setTimeout(() => {
                props.setBoxes(prevBoxes => prevBoxes.map((boxRows) => {
                    return (boxRows.map((box) => {
                        return box.id === guessRowStartIndex + index
                        ? {...box, correctPlace: placement} 
                        : box
                    }))
                }))
                // once guess row is completely revealed, reveal colors on keyboard
                if (index === comparisonArray.length - 1) {
                    // keyboard colors reveal a little too quick, so added another setTimeout
                    setTimeout(() => {
                        passColorsToKeyboard(comparisonArray, word)
                        setParalysis(false)
                        props.isGameOver(word, row)
                    }, 200)
                }
            }, 300 * index)
        })
    }

    const passColorsToKeyboard = (comparisonArray, word) => {
        const colorLetterInfo = []
        let mostAccuratePlace
        // splitting word into char word array by each letter --> easier to label which to skip
        let wordArray = word.split('')
        for (let i = 0; i < wordArray.length; i++) {
            mostAccuratePlace = comparisonArray[i]
            for (let j = i + 1; j < wordArray.length; j++) {
                if (wordArray[i] === wordArray[j]) {
                    if (mostAccuratePlace === 'no' && (comparisonArray[j] === 'almost' || comparisonArray[j] === 'yes')) {
                        mostAccuratePlace = comparisonArray[j]
                        // replace letter to know to skip
                        wordArray[j] = 'skip'
                    }
                    if (mostAccuratePlace === 'almost' && comparisonArray[j] === 'yes') {
                        mostAccuratePlace = comparisonArray[j]
                        wordArray[j] = 'skip'
                    }
                    if (mostAccuratePlace === 'yes' && comparisonArray[j] !== 'yes') {
                        wordArray[j] = 'skip'
                    }
                }
            }
            if (wordArray[i] !== 'skip') {
                colorLetterInfo.push({
                    letter: wordArray[i],
                    placementColor: mostAccuratePlace,
                }) 
            }
        }
        props.colorKeyboard(colorLetterInfo)
    }

    const boxElements = props.boxes.map(boxRows => {
        return (boxRows.map(box => {
            return <Box key={box.id} letter={box.letter} correctPlace={box.correctPlace}/>
        }))    
    })


    return (
        <div className='grid-container'>
            {boxElements}
        </div>
    )
})

export default Grid