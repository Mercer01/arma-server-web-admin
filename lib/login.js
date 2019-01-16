var mysql = require('mysql')
// var async = require('async')
// var fs = require('fs.extra')

var Login = function (config) {
  this.config = config
}
Login.mysqlstart = function () {
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pwd',
    database: 'arma-web-admin'
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
  var today = new Date()
  var users = {
    'first_name': req.body.first_name,
    'last_name': req.body.last_name,
    'email': req.body.email,
    'password': req.body.password,
    'created': today,
    'modified': today
  }
  var connection = Login.mysqlstart
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
  var email = req.body.email
  var password = req.body.password
  var connection = Login.mysqlstart
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
