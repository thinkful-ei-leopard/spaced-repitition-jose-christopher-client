import React, { Component } from 'react'
import LanguageApiService from '../../services/language-api-service'

export class Dashboard extends Component {
  state = {
    language: {},
    words: []
  }

  componentDidMount(){
    LanguageApiService.getHead()
      .then(res => this.setState({
        language: res.language,
        words: res.words
      }))
      .catch(res => console.log(res))
  }

  render() {
    const renderWordList = this.state.words.map(wordObject => {
      return (
        <div className='word-info-container'>
          <p>{wordObject.original}</p>
          <p>Correct count: {wordObject.correct_count}</p>
          <p>Incorrect count: {wordObject.incorrect_count}</p>
        </div>
      )
    })

    return (
      <div className='dashboard'>
        <h1>{this.state.language.name}</h1>
        <button>Start practicing</button>
        <h2>Words to practice</h2>
        {renderWordList}
      </div>
    )
  }
}

export default Dashboard
