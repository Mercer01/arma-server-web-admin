import React, { Component } from 'react'
import './Nav_Bar.css'

class Nav_Bar extends Component {
  constructor (props) {
    super(props)
    this.handleServerTabOpen = this.handleServerTabOpen.bind(this)
    this.handleServerTabClose = this.handleServerTabClose.bind(this)
    this.state = { serverTabOpen: false }
  }

  handleServerTabOpen () {
    this.setState({ serverTabOpen: true })
  }

  handleServerTabClose () {
    this.setState({ serverTabOpen: false })
  }

  ServerListingCreate () {
  let server_names = ['Ben', 'Bob', 'Jerry', 'Tim']
  let server_names_li = server_names.map(function (name) {
    return <li>{name}</li>
  })
  return <ul>{server_names_li} </ul>
}

  render () {
    let server_a
    if (this.state.serverTabOpen) {
      server_a = <li>
        <a href="#Servers" id="server_nav_bar" onClick={this.handleServerTabClose}>Servers</a>
        {this.ServerListingCreate()}
      </li>

    } else {
      server_a = <li>
        <a href="#Servers" id="server_nav_bar" onClick={this.handleServerTabOpen}>Servers</a>
      </li>
    }

    return (
      <div className="navbar navbar-default navbar-fixed-top" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="#Homepage">Arma Server Admin Homepage</a>
          </div>
          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="#Dashboard">Dashboard</a>
              </li>
              <li>
                <a href="#Logs">Logs</a>
              </li>
              <li>
                <a href="#Missions">Missions</a>
              </li>
              <li>
                <a href="#Mods">Mods</a>
              </li>
                {server_a}
              <li>
                <a href="Users">Users</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

function UserGreeting (props) {
  return <h1>Welcome back!</h1>
}

function GuestGreeting (props) {
  return <h1>Please sign up.</h1>
}

function Greeting (props) {
  const isLoggedIn = props.isLoggedIn
  if (isLoggedIn) {
    return <Nav_Bar.ServerListingCreate/>
    // return <UserGreeting/>
  }
  return <GuestGreeting/>
}

function LoginButton (props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  )
}

function LogoutButton (props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  )
}

class LoginControl extends React.Component {
  constructor (props) {
    super(props)
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
    this.state = { isLoggedIn: false }
  }

  handleLoginClick () {
    this.setState({ isLoggedIn: true })
  }

  handleLogoutClick () {
    this.setState({ isLoggedIn: false })
  }

  render () {
    const isLoggedIn = this.state.isLoggedIn
    let button

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick}/>
    } else {
      button = <LoginButton onClick={this.handleLoginClick}/>
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn}/>
        {button}
      </div>
    )
  }
}

export { Nav_Bar, Greeting, LoginControl }
