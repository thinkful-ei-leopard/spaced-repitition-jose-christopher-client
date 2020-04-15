import React from 'react'

const LearnContext = React.createContext({
    nextWord: '',
    totalScore: 0,
    wordCorrectCount: 0,
    wordIncorrectCount: 0,
    setLearnValues: () => {},
})

export default LearnContext

export class LearnProvider extends React.Component {
    state = {
        nextWord: '',
        totalScore: 0,
        wordCorrectCount: 0,
        wordIncorrectCount: 0,
    }

    setLearnValues = (nextWord, totalScore, wordCorrectCount, wordIncorrectCount) => {
        this.setState({
            nextWord,
            totalScore,
            wordCorrectCount,
            wordIncorrectCount
        })
    }

    render() {
        const value = {
            nextWord: this.state.nextWord,
            totalScore: this.state.totalScore,
            wordCorrectCount: this.state.wordCorrectCount,
            wordIncorrectCount: this.state.wordIncorrectCount,
            setLearnValues: this.setLearnValues,
        }

        return (
            <LearnContext.Provider value={value}>
                {this.props.children}
            </LearnContext.Provider>
        )
    }
}