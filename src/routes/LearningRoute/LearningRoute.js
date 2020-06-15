import React, { Component } from 'react'
import Learn from '../../components/Learn/Learn'
import './LearningRoute.css'

class LearningRoute extends Component {
  render() {
    return (
      <section className='learnSection flip-card'>
        <Learn />
      </section>
    );
  }
}

export default LearningRoute
