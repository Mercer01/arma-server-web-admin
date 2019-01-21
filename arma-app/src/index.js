import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Greeting, LoginControl, Nav_Bar } from './Nav_Bar'

ReactDOM.render(<App/>, document.getElementById('root'))
ReactDOM.render(<Nav_Bar/>, document.getElementById('nav-bar-root'))
ReactDOM.render(
  <Greeting isLoggedIn={false}/>,
  document.getElementById('root')
)
ReactDOM.render(
  <LoginControl/>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
