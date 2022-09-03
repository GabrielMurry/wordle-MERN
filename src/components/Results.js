import React from 'react'

function Results() {

    const playAgain = () => {
        console.log('hi')
    }

    return (
        <div>
            <button className='play-again-button' onClick={playAgain}>Play Again?</button>
        </div>
    )
}

export default Results