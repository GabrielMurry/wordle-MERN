import React from 'react'
import Key from './Key'

const Keyboard = (props) => {

    const keyElements = props.keys.map(key => (
        <Key key={key.id} letter={key.letter} correctPlace={key.correctPlace} keyboardClicked={props.keyboardClicked}/>
    ))

    return (
        <div className='keyboard-container' >
            {keyElements}
        </div>
    )
}

export default Keyboard