let express = require('express')
let path = require('path')

const UseMemDB = true

module.exports = function (LoginManager) {
  let router = express.Router()

  router.post('/register', function (req, res) {
    let response = LoginManager.register(req, res)
    res.send(response)
  })

  router.post('/', async (req, res) => {
    console.log(req.body)
    let email = req.body.email
    let password = req.body.password
    console.log(email, password)

    if (email === undefined || password === undefined) {
      console.log('Undefined U/P')
      res.status(400).send({"msg": 'A username or password was not specified'})
    } else {
      if (!UseMemDB) {
        LoginManager.login(email, password, res)
      } else {
        LoginManager.login_memory(email, password, res)
      }
    }
  })

  return router
}
