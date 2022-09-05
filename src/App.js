import React from 'react'
// import Register from './Register'
import Wordle from './Wordle'

function App() {
    // const [success, setSuccess] = React.useState(false)
    return (
        <main>
            {/* {!success ? (
                <section className='register-container'>
                    <Register success={success} setSuccess={setSuccess}/>
                </section>
            ) : ( */}
                <Wordle />
            {/* )} */}
        </main>
    )
}

export default App