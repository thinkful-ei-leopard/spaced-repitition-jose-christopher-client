import React from 'react'
import ReactGlobe from 'react-globe'
import {Link} from 'react-router-dom'
import './Landing.css'

function Landing() {
    return (
        <>
        <div className='infoCont'>
            <p className='hablaInfo'>
                Practice learning a language with the Spaced Repetition revision technique.
            </p>
            <Link to='/register' 
                className='landingLink'>Register
            </Link>
        </div>
        <div className='globe'>
            <ReactGlobe globeOptions={{
                    enableBackground: false,
                    cloudsOpacity: 0.8,
                    enableClouds: true,
                }}
                cameraOptions={{
                    autoRotateSpeed: 2,
                }}
            />
        </div>
        </>
    )
}

export default Landing