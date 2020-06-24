import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import './Header.css'
import {slide as Menu} from 'react-burger-menu'

class Header extends Component {
  static contextType = UserContext

  state = {open: false}

  componentDidMount() {
    this.setState({ open: false })
  }

  componentWillUnmount() {
    this.setState({ open: false })
  }

  handleLinkClick = () => {
    this.setState({ open: false })
  }

  handleLogoutClick = () => {
    this.context.processLogout()
    this.setState({open: false})
  }

  handleStateChange(state) {
    this.setState({ open: state.isOpen })
  }

  renderLogoutLink() {
    return (
      <>
        <span className='userSpan'>
          {this.context.user.name}
        </span>
          <Link
            onClick={this.handleLogoutClick}
            to='/login'
            className='logoutLink'
            >
            Logout
          </Link>
      </>
    )
  }

  renderLoginLink() {
    return (
      <>
        <Link to='/login' className='loginLink' onClick={this.handleLinkClick}>Login</Link>
        {' '}
        <Link to='/register' className='signUpLink' onClick={this.handleLinkClick}>Sign up</Link>
      </>
    )
  }

  render() {
    return (
      <header id="outer-container">
        <h1 className='hablaH1'>
          <Link to={TokenService.hasAuthToken() ? '/dashboard' : '/'} className='hablaLink'>
            habla
          </Link>
        </h1>
        <Menu right outerContainerId={"outer-container"} 
        isOpen={this.state.open} onStateChange={(state) => this.handleStateChange(state)}>
          {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
          <Link 
          to={TokenService.hasAuthToken() ? '/dashboard' : '/'} 
          className='homeLink' onClick={this.handleLinkClick}>
            {TokenService.hasAuthToken() ? 'Dashboard' : 'Home'}
          </Link>
        </Menu>
      </header>
    );
  }
}

export default Header
