import React from 'react'

function Key(props) {

    const styles = {
        backgroundColor: getBackGroundColor(),
        color: props.correctPlace !== 'blank' ? 'white' : 'black'
    }

    function getBackGroundColor() {
        if (props.correctPlace === 'blank') {
            return '#d6d7d8'
        }
        else if (props.correctPlace === 'no') {
            return '#787878'
        }
        else if (props.correctPlace === 'almost') {
            // return '#d0bd55'
            return '#957DAD'
        }
        else if (props.correctPlace === 'yes') {
            // return '#6db562'
            return '#FEC8D8'
        }
    }

    function keyboardClicked(letter) {
        // shooting this keyboard-pressed-letter all the way up the chain!
        const keyLetter = {key: letter.toLowerCase()}
        props.keyboardClicked(keyLetter)
    }

    return (
        <button className='key-individual' style={styles} onClick={() => keyboardClicked(props.letter)}>
            {props.letter}
        </button>
    )
}

export default Key