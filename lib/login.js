const mysql = require('mysql')
// var async = require('async')
// var fs = require('fs.extra')

const Login = function (config) {
  this.config = config
}

Login.mysqlstart = function () {
  const connection = mysql.createConnection({
    host: this.config.host,
    user: this.config.user,
    password: this.config.password,
    database: this.config.database
  })
  connection.connect(function (err) {
    if (!err) {
      console.log('Database is connected ... nn')
    } else {
      console.log('Error connecting database ... nn')
    }
  })
  return connection
}

Login.Register = function (req, res) {
  // console.log('req',req.body);
  const today = new Date()
  const users = {
    'first_name': req.body.first_name,
    'last_name': req.body.last_name,
    'email': req.body.email,
    'password': req.body.password,
    'created': today,
    'modified': today
  }
  const connection = Login.mysqlstart
  connection.query('INSERT INTO users SET ?', users, function (error, results, fields) {
    if (error) {
      console.log('error ocurred', error)
      res.send({
        'code': 400,
        'failed': 'error ocurred'
      })
    } else {
      console.log('The solution is: ', results)
      res.send({
        'code': 200,
        'success': 'user registered sucessfully'
      })
    }
  })
}

Login.login = function (req, res) {
  const email = req.body.email
  const password = req.body.password
  const connection = Login.mysqlstart
  connection.query('SELECT * FROM users WHERE email = ?', [email], function (error, results, fields) {
    if (error) {
      // console.log('error ocurred',error);
      res.send({
        'code': 400,
        'failed': 'error ocurred'
      })
    } else {
      // console.log('The solution is: ', results);
      if (results.length > 0) {
        if (results[0].password === password) {
          res.send({
            'code': 200,
            'success': 'login sucessfull'
          })
        } else {
          res.send({
            'code': 204,
            'success': 'Email and password does not match'
          })
        }
      } else {
        res.send({
          'code': 204,
          'success': 'Email does not exits'
        })
      }
    }
  })
}

module.exports = Login
