import React from 'react'
import Confetti from 'react-confetti'

function WinAnimation(props) {
    return (
        <div>
            {props.wordleWin && <Confetti />}
        </div>
    )
}

export default WinAnimation