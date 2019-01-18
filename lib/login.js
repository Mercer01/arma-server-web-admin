const mysql = require('mysql')
let configdb = require('../config')
const fs = require('fs')
const uuidv4 = require('uuid/v4')
let sqlPromise = null
const day_in_milliseconds = 86400000

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

Login.prototype.login_memory = async (email, password, res, req) => {
  const contents = fs.readFileSync('mem_db.json')
  const jsonFile = JSON.parse(contents)
  if (email in jsonFile['users']) {
    if (jsonFile['users'][email] === password) {
      let uuidv4_token = uuidv4()
      res.cookie('login_token', uuidv4_token, { expires: new Date(Date.now() + day_in_milliseconds) })
      jsonFile['signed_in_uuid'][uuidv4_token] = new Date(Date.now())
      console.log(uuidv4_token)
      fs.writeFileSync('mem_db.json', JSON.stringify(jsonFile), 'utf8')
      res.send({ 'msg': true })
    } else {
      res.status(403).send({ 'msg': 'Invalid password' })
    }
  } else {
    res.status(403).send({ 'msg': 'Invalid username' })
  }
}

Login.prototype.is_signed_in = async (req) => {
  const contents = fs.readFileSync('mem_db.json')
  const jsonFile = JSON.parse(contents)
  let cookie_login_token = req.cookies['login_token']
  let signed_in_list = jsonFile['signed_in_uuid']
  let cookie_expiry = new Date(signed_in_list[cookie_login_token])
  if (cookie_login_token in signed_in_list) {
    return (cookie_expiry.getTime() + day_in_milliseconds) >= new Date(Date.now()).getTime()
  } else {
    console.log('FALSE')
    return false
  }
}

module.exports = Login
