import React, { Component } from 'react'
import Learn from '../../components/Learn/Learn'
import './LearningRoute.css'
import {Link} from 'react-router-dom'
import backArrow from '../../Images/left-arrow-svgrepo-com.svg'

class LearningRoute extends Component {
  render() {
    return (
      <>
      <Link to='/dashboard' className='learnBack'>
        <img className='back-icon' src={backArrow} alt='swipe-back-icon' />
      </Link>
      <section className='learnSection'>
        <Learn />
      </section>
      </>
    );
  }
}

export default LearningRoute
