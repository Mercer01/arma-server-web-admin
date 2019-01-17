let express = require('express')
let path = require('path')

module.exports = function (LoginManager) {
  let router = express.Router()

  router.post('/register', function (req, res) {
    let response = LoginManager.register(req, res)
    res.send(response)
  })

  router.post('/', async (req, res) => {
    let email = req.body.email
    let password = req.body.password

    if(email === undefined || password === undefined) {

      res.status(400).send("A username or Password was not specified")
    } else {
      LoginManager.login(email,password)
        .then(console.log(result))

      
    }
  })

  return router
}
