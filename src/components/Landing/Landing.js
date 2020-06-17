import React from 'react'
import ReactGlobe from 'react-globe'
import './Landing.css'

function Landing() {
    return (
        <>
        <p className='hablaInfo'>
          Practice learning a language with the Spaced Repetition revision technique.
        </p>
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