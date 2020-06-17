import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import './Header.css'
import {slide as Menu} from 'react-burger-menu'

class Header extends Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout()
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
        <Link to='/login' className='loginLink'>Login</Link>
        {' '}
        <Link to='/register' className='signUpLink'>Sign up</Link>
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
        <Menu right outerContainerId={"outer-container"}>
          {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
        </Menu>
      </header>
    );
  }
}

export default Header
