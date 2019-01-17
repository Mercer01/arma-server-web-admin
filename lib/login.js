let mysql = require('mysql')
let configdb = require('../config')
let sqlPromise = null

let Login = function (config) {
  this.config = config
}

async function init () {
  if (sqlPromise) return sqlPromise
  sqlPromise = newConnection()
  return sqlPromise
}

async function newConnection () {
  // todo: this should really use connection pools
  const sql = await mysql.createConnection(configdb.mysql)

  // handle unexpected errors by just logging them
  sql.on('error', (err) => {
    console.error(err)
    // sql.end();
  })

  return sql
}

async function releaseConnection (connection) {
  await connection.end()
}

Login.prototype.register = async function (req, res) {
  const connection = await init()
  let today = new Date()
  const query = connection.format('INSERT INTO users SET ?', {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: today,
    modified: today
  })
  await connection.query(query)
}

Login.prototype.login = async (email, password, res) => {
  const connection = await init()

  const query = connection.format('SELECT * FROM users WHERE email = ? AND password = ?')
  connection.query(query, [email, password], (err, response) => {
    if (err) {
      res.status(500).send(err)
    } else {
      if (response.length > 1) {
        res.send('Uh this shouldn\'t have been hit a duplicate user exists')
      } else {
        res.send('True')
      }
    }
  })
}

Login.prototype.login_memory = async (email, password, res) => {
  const jsonFile = require('../test/mem_db')
  if (email in jsonFile) {
    if (jsonFile.email === password) {
      res.send('True')
    } else {
      res.status(403).send('Invalid password')
    }
  } else {
    res.status(403).send('Invalid username')
  }
}

module.exports = Login
