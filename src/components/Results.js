import React from 'react'

function Results(props) {

    const resultsFadeIn = {
        animationName: 'fadeIn',
        animationDelay: '3s',
        animationDuration: '1s',
        animationFillMode: 'forwards' // so it stays at new opacity '1'
    }

    React.useEffect(() => {

        const listenForEnter = (event) => {
            if (event.key === 'Enter') {
                props.playAgain()
            }
        }
        document.addEventListener('keydown', listenForEnter)
        return () => {
            document.removeEventListener('keydown', listenForEnter)
        }
    }, [props])

    return (
        <div className='results-container' style={resultsFadeIn}>
            <button className='play-again-button' onClick={props.playAgain}>Play Again</button>
            <p className='play-again-enter-key'>or Press Enter</p>
        </div>
    )
}

export default Results