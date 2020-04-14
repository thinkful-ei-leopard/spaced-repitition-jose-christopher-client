import React from 'react'

const LanguageContext = React.createContext({
    language: {},
    words: [],
    state: {},
    setLanguage: () => {},
    setWords: () => {},
    setError: () => {},
})

export default LanguageContext

export class LanguageProvider extends React.Component {
    state = {
        language: {},
        words: [],
        error: null,
        isLoading: null,
    }

    setLanguage = language => {
        this.setState({ language })
    }

    setWords = items => {
        this.setState({ words: items })
    }

    setError = error => {
        this.setState({ error })
    }

    render() {
        const value = {
            language: this.state.language,
            words: this.state.words,
            error: this.state.error,
            isLoading: this.state.isLoading,
            setLanguage: this.setLanguage,
            setWords: this.setWords,
            setError: this.setError,
            state: this.state,
        }

        return (
            <LanguageContext.Provider value={value}>
                {this.props.children}
            </LanguageContext.Provider>
        )
    }
}
