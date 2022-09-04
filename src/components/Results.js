import React from 'react'

function Results(props) {

    const resultsFadeIn = {
        animationName: 'fadeIn',
        animationDelay: '3s',
        animationDuration: '1s',
        animationFillMode: 'forwards' // so it stays at new opacity '1'
    }

    return (
        <div className='results-container' style={resultsFadeIn}>
            <button className='play-again-button' onClick={props.playAgain}>Play Again?</button>
        </div>
    )
}

export default Results