import React, { Component } from 'react'
import LearnContext from '../../contexts/LearnContext'
import LanguageService from '../../services/language-api-service'

export default class Learn extends Component {
static contextType = LearnContext

componentDidMount() {
    LanguageService.getLanguageHead()
    .then( res => {
        this.context.setLearnValues(
            res.nextWord,
            res.totalScore,
            res.wordCorrectCount,
            res.wordIncorrectCount
        )
    })
}

render() {
    return (
        <>
        <h2>Translate the word:
        </h2>
        <span>{this.context.nextWord}</span>
        <p>Your total score is: {this.context.totalScore}</p>
        <form className='main form'>
            <label htmlFor='learn-guess-input'>
                What's the translation for this word?
            </label>
            <input id='learn-guess-input' type='text' required>
            </input>
            <button type='submit'>Submit your answer</button>
        </form>
        <p>You have answered this word correctly {this.context.wordCorrectCount} times.</p>
        <p>You have answered this word incorrectly {this.context.wordIncorrectCount} times.</p>
        </>
    )
}
}