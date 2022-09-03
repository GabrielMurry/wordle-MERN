import React from 'react'

function PopupDisplays(props) {
    return (
        <div className='popup-container'>
            {props.gameOver && <h2 className='win-or-lose-display'>{props.wordleWin ? 'You win!' : 'You lose'}</h2>}
            {props.gameOver && !props.wordleWin && <h2 className='solution-display'>Solution: {props.solutionWord}</h2>}
            {!props.wordExists && <h2 className='word-does-not-exist-display'>Word does not exist</h2>}
        </div>
    )
}

export default PopupDisplays