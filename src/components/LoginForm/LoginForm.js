import React, { Component } from 'react'
import { Input, Label } from '../Form/Form'
import AuthApiService from '../../services/auth-api-service'
import UserContext from '../../contexts/UserContext'
import Button from '../Button/Button'
import './LoginForm.css'

class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => { }
  }

  static contextType = UserContext

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { username, password } = ev.target
    this.context.setLoading()
    this.setState({ error: null })

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then(res => {
        username.value = ''
        password.value = ''
        this.context.processLogin(res.authToken)
        this.props.onLoginSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
    this.firstInput.current.focus()
    this.context.clearLoading()
  }

  componentWillUnmount() {
    this.context.clearLoading()
  }

  render() {
    const { error } = this.state

    return (
      <>
      {this.context.isLoading && 
      this.state.error === null ? <div id="loader"></div> :
      <form
        className='LoginForm'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p>{error}</p>}
        </div>
        <div
          className='login-div'
        >
          <Label htmlFor='login-username-input' className='loginLabel'>
            Username
          </Label>
          <Input
            ref={this.firstInput}
            id='login-username-input'
            name='username'
            className='loginInput'
            required
          />
        </div>
        <div
          className='login-div'
        >
          <Label htmlFor='login-password-input' className='loginLabel'>
            Password
          </Label>
          <Input
            id='login-password-input'
            name='password'
            type='password'
            className='loginInput'
            required
          />
        </div>
        <Button type='submit'>
          Login
        </Button>
      </form>}
      </>
    )
  }
}

export default LoginForm
