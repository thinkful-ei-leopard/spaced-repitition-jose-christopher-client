import React, { Component } from 'react'
import LearnContext from '../../contexts/LearnContext'
import LanguageService from '../../services/language-api-service'
import './Learn.css'

export default class Learn extends Component {
static contextType = LearnContext

state ={touched: false}

componentDidMount() {
    this.setState({touched: false})
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

handleViewScore = () => {
    this.setState({touched: !this.state.touched})
    console.log(this.state.touched)
}

submitGuess = event => {
    event.preventDefault()
    let guess = event.target.guessInput.value
    this.context.saveGuess(guess)

    LanguageService.postGuess(guess)
    .then(res => {
        this.context.setCorrectValue(res.isCorrect)
        this.context.setGuessResponse(res)
    })
}

handleAnotherWord = event => {
    event.preventDefault()

    LanguageService.getLanguageHead()
    .then(res => {
        this.context.resetCorrectValue()
        this.context.setLearnValues(
            res.nextWord,
            res.totalScore,
            res.wordCorrectCount,
            res.wordIncorrectCount
        )
    })
}

componentWillUnmount() {
    this.setState({touched: false})
    this.context.resetCorrectValue()
}

render() {
    let resp = this.context.guessResponse || {}
    if(this.context.isCorrect === null) {
    return (
        <>
        {this.state.touched === false ? 
        <>
        <h2 className='learnH2'>Translate the word:
        </h2>
        <span className='learnSpan' aria-live='polite' lang='es'>{this.context.nextWord}</span>
        <form className='main form learnForm' onSubmit={this.submitGuess}>
            <label htmlFor='learn-guess-input'>
                What's the translation for this word?
            </label>
            <input id='learn-guess-input' type='text' name='guessInput' required placeholder='Insert your answer here!'>
            </input>
            <button type='submit'>Submit your answer</button>
        </form>
        </>

        : 
        <>
        <p className='totalPara'>Your total score is: {this.context.totalScore}</p>
        <p className='correctPara'>You have answered this word correctly {this.context.wordCorrectCount} times.</p>
        <p className='incorrectPara'>You have answered this word incorrectly {this.context.wordIncorrectCount} times.</p>
        </>
    }
        <button onClick={this.handleViewScore} className='views'>
            {this.state.touched ? 'view word' : 'view score'}
        </button>
        </>
    )
    } else if(this.context.isCorrect === false){
        return (
            <>
            <h2 className='learnH2Render'>Good try, but not quite right :(</h2>
            <p className='displayScore'>Your total score is: {resp.totalScore}</p>
            <p className='displayFeedback'>The correct translation for {this.context.nextWord} was {resp.answer} and you chose {this.context.userGuess}!</p>
            <button onClick={this.handleAnotherWord} className='learnButton'>Try another word!</button>
            </>
        )
    } else {
        return (
            <>
            <h2 className='learnH2Render'>You were correct! :D</h2>
            <p className='displayScore'>Your total score is: {resp.totalScore}</p>
            <p className='displayFeedback'>The correct translation for {this.context.nextWord} was {resp.answer} and you chose {this.context.userGuess}!</p>
            <button onClick={this.handleAnotherWord} className='learnButton'>Try another word!</button>
            </>
        )
    }
}
}