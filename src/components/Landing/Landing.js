import React from 'react'
import {Link} from 'react-router-dom'
import Globe from 'react-globe.gl'
import './Landing.css'

function Landing() {
    return (
        <>
        <div className='infoCont'>
            <h2 className='hablaMobile'>habla</h2>
            <p className='hablaInfo'>
                Practice learning a language with the Spaced Repetition revision technique.
            </p>
            <Link to='/register' 
                className='landingLink'>Register
            </Link>
        </div>
        <div className='globe'>
            <Globe
            backgroundColor="#FFFFFF"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            />
        </div>
        </>
    )
}

export default Landing