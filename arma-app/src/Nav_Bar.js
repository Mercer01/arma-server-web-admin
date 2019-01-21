import React, { Component } from 'react'
import './Nav_Bar.css'

class ServerNavBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      server_data: null,
      is_loading: true
    }
  }

  componentDidMount () {
    this.setState({ is_loading: true })
    this.setState({
      server_data: ['tio', 'tom'],
      is_loading: false
    })
    fetch('/api/servers')
      .then(response => response.json())
      // .then(data => this.setState({
      //   server_data: ['test', 'tom', 'tim', 'mercer is a penis'],
      //   is_loading: false
      // }))
      .then(data => this.setState({
        server_data: data,
        is_loading: false
      }))
    console.log('I RAN')
  }

  render () {
    if (this.state.is_loading === true) {
      return <ul>
        <li>
          "Loading"
        </li>
      </ul>
    } else {
      let server_names = []
      console.log(this.state.server_data)
      for (const server of this.state.server_data) {
        server_names.push(server.id)
      }
      console.log(server_names)
      let server_names_li = server_names.map(function (name, index) {
        return <li key={index}>{name}</li>
      })
      return <ul>{server_names_li} </ul>
    }

  }
}

class NavBar extends Component {
  constructor (props) {
    super(props)
    this.handleServerTabOpen = this.handleServerTabOpen.bind(this)
    this.handleServerTabClose = this.handleServerTabClose.bind(this)
    this.state = {
      serverTabOpen: false,
      server_data: null,
      is_loading: false
    }
  }

  handleServerTabOpen () {
    this.setState({ serverTabOpen: true })
    // this.callApi()
  }

  handleServerTabClose () {
    this.setState({ serverTabOpen: false })
  }

  //   let b = (async () => {
  //     const api_res = await fetch('/api/servers')
  //     let res_json = await api_res.json()
  //     let server_names = []
  //     for (const server of res_json) {
  //       server_names.push(server.id)
  //     }
  //     console.log(server_names)
  //     let server_names_li = server_names.map(function (name) {
  //       return <li>{name}</li>
  //     })
  //     return <ul>{server_names_li} </ul>
  //   })(console.log(a))
  // a.then(result => {
  //   console.log(result)
  //   return result
  // })
  // }

  render () {
    let server_a
    if (this.state.serverTabOpen) {
      server_a = <li>
        <a href="#Servers" id="server_nav_bar" onClick={this.handleServerTabClose}>Servers</a>
        <ServerNavBar/>

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

export { NavBar }
