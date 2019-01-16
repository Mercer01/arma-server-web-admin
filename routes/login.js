var express = require('express')
let path = require('path')

module.exports = function (LoginManager) {
  var router = express.Router()

  router.post('/register', function (req, res) {
    var response = LoginManager.register(req, res)
    res.send(response)
  })

  router.post('/', function (req, res) {
    var response = LoginManager.login(req, res)
    res.send(response)
  })

  return router
}
