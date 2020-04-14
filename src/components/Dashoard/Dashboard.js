import React, { Component } from 'react'
import LanguageApiService from '../../services/language-api-service'
import LanguageContext from '../../contexts/LanguageContext'
import { Link } from 'react-router-dom'
import './Dashboard.css'

export class Dashboard extends Component {
  static contextType = LanguageContext

  componentDidMount(){
    LanguageApiService.getHead()
    .then(res => {
      this.context.setLanguage(res.language)
      this.context.setWords(res.words)
    })
    .catch(res => {
      this.context.setError(res)
    })
  }


  render() {
    console.log(this.context.state)
    console.log(this.context.language)
    console.log(this.context.words)
    const renderWordList = this.context.words.map(wordObject => {
      return (
        <li className='main section li' key={wordObject.id}>
          <h4 className='wordH4'>{wordObject.original}</h4>
          <p className='wordPara'>correct answer count: {wordObject.correct_count}</p>
          <p className='wordPara'>incorrect answer count: {wordObject.incorrect_count}</p>
        </li>
      )
    })

    return (
      <section className='main section'>
        <h2 className='dashH2'>{this.context.language.name}</h2>
        <Link to='/learn' className='startPracticeLink'>
          Start practicing
        </Link>
        <h3 className='dashH3'>Words to practice</h3>
        <ul className='mainUL' aria-live='polite'>
        {renderWordList}
        </ul>
        <p className='dashPara'>Total correct answers: {this.context.language.total_score}</p>
      </section>
    )
  }
}

export default Dashboard
