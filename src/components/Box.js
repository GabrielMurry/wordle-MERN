import React from 'react'

function Box(props) {

    const flipBox = {
        transform: props.correctPlace !== 'blank' ? 'rotateX(180deg)' : 'none',
        border: props.correctPlace !== 'blank' ? 'none' : '2px solid lightgray',
    }
    const flipBoxBack = {
        backgroundColor: getBackGroundColor(),
        color: props.correctPlace !== 'blank' ? 'white' : 'black',
        transform: props.correctPlace !== 'blank' ? 'rotateX(180deg)' : 'none',
    }

    function getBackGroundColor() {
        if (props.correctPlace === 'blank') {
            return '#FFFFFF'
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

    return (
        <div className='flip-box' style={flipBox}>
            <div className='flip-box-front'>
                {props.letter}
            </div>
            <div className='flip-box-back' style={flipBoxBack}>
                {props.letter}
            </div>
        </div>
    )
}

export default Box