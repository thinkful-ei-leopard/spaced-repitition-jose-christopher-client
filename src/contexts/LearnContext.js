import React from 'react'

const LearnContext = React.createContext({
    nextWord: '',
    totalScore: 0,
    wordCorrectCount: 0,
    wordIncorrectCount: 0,
    isCorrect: null,
    state: {},
    guessResponse: {},
    userGuess: '',
    setLearnValues: () => {},
    setCorrectValue: () => {},
    resetCorrectValue: () => {},
    setGuessResponse: () => {},
    saveGuess: () => {},
})

export default LearnContext

export class LearnProvider extends React.Component {
    state = {
        nextWord: '',
        totalScore: 0,
        wordCorrectCount: 0,
        wordIncorrectCount: 0,
        isCorrect: null,
        guessResponse: {},
        userGuess: ''
    }

    setLearnValues = (nextWord, totalScore, wordCorrectCount, wordIncorrectCount) => {
        this.setState({
            nextWord,
            totalScore,
            wordCorrectCount,
            wordIncorrectCount
        })
    }

    setGuessResponse = value => {
        this.setState({ guessResponse: value })
    }

    setCorrectValue = value => {
        this.setState({ isCorrect: value })
    }

    resetCorrectValue = () => {
        this.setState({ isCorrect: null })
    }

    saveGuess = value => {
        this.setState({ userGuess: value })
    }

    render() {
        const value = {
            nextWord: this.state.nextWord,
            totalScore: this.state.totalScore,
            wordCorrectCount: this.state.wordCorrectCount,
            wordIncorrectCount: this.state.wordIncorrectCount,
            setLearnValues: this.setLearnValues,
            isCorrect: this.state.isCorrect,
            setCorrectValue: this.setCorrectValue,
            state: this.state,
            resetCorrectValue: this.resetCorrectValue,
            guessResponse: this.state.guessResponse,
            setGuessResponse: this.setGuessResponse,
            saveGuess: this.saveGuess,
            userGuess: this.state.userGuess,
        }

        return (
            <LearnContext.Provider value={value}>
                {this.props.children}
            </LearnContext.Provider>
        )
    }
}