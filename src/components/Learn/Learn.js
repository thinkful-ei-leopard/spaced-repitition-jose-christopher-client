import React, { Component } from 'react'
import LearnContext from '../../contexts/LearnContext'
import LanguageService from '../../services/language-api-service'

export default class Learn extends Component {
static contextType = LearnContext

componentDidMount() {
    this.context.resetCorrectValue()

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

submitGuess = event => {
    event.preventDefault()
    let guess = event.target.guessInput.value
    this.context.saveGuess(guess)

    LanguageService.postGuess(guess)
    .then(res => {
        this.context.setCorrectValue(res.isCorrect)
        this.context.setGuessResponse(res)
        console.log(res)
    })
}

componentWillUnmount() {
    this.context.resetCorrectValue()
}

render() {
    console.log(this.context.state)
    let resp = this.context.guessResponse || {}
    if(this.context.isCorrect === null) {
    return (
        <>
        <h2>Translate the word:
        </h2>
        <span>{this.context.nextWord}</span>
        <p>Your total score is: {this.context.totalScore}</p>
        <form className='main form' onSubmit={this.submitGuess}>
            <label htmlFor='learn-guess-input'>
                What's the translation for this word?
            </label>
            <input id='learn-guess-input' type='text' name='guessInput' required>
            </input>
            <button type='submit'>Submit your answer</button>
        </form>
        <p>You have answered this word correctly {this.context.wordCorrectCount} times.</p>
        <p>You have answered this word incorrectly {this.context.wordIncorrectCount} times.</p>
        </>
    )
    } else if(this.context.isCorrect === false){
        return (
            <>
            <p className='DisplayScore p'>Your total score is: {resp.totalScore}</p>
            <h2>Good try, but not quite right :(</h2>
            <p className='DisplayFeedback p'>The correct translation for {this.context.nextWord} was {resp.answer} and you chose {this.context.userGuess}!</p>
            <button>Try another word!</button>
            </>
        )
    } else {
        return (
            <>
            <h2>You were correct! :D</h2>
            <p className='DisplayScore p'>Your total score is: {resp.totalScore}</p>
            <p className='DisplayFeedback p'>The correct translation for {this.context.nextWord} was {resp.answer} and you chose {this.context.userGuess}!</p>
            <button>Try another word!</button>
            </>
        )
    }
}
}