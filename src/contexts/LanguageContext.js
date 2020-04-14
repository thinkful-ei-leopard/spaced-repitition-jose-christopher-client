import React from 'react'

const LanguageContext = React.createContext({
    language: {},
    words: [],
})

export default LanguageContext

export class LanguageProvider extends React.Component {
    state = {
        language: {},
        words: [],
        error: null,
        isLoading: null,
    }

    render() {
        const value = {
            language: this.state.language,
            words: this.state.words,
            error: this.state.error,
            isLoading: this.state.isLoading,
        }

        return (
            <LanguageContext.Provider value={value}>
                {this.props.children}
            </LanguageContext.Provider>
        )
    }
}
