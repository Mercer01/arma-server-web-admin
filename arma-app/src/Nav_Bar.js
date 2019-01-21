import React, { Component } from 'react';
import './Nav_Bar.css';

class Nav_Bar extends Component {
  render() {
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
              <li>
                <a href="#Servers" id="server_nav_bar">Servers</a>
              </li>
              <li>
                <a href="Users">Users</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Nav_Bar;
