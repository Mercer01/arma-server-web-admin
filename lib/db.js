const mysql = require('mysql')
const mem_status = require('../routes/login')
let configdb = require('../config')
let sqlPromise = null

async function init () {
  if (mem_status.UseMemDB === true) {
    if (sqlPromise) return sqlPromise
    sqlPromise = newConnection()
    return sqlPromise
  }
}

async function newConnection () {
  if (mem_status.UseMemDB === true) {
    // todo: this should really use connection pools
    const sql = await mysql.createConnection(configdb.mysql)

    // handle unexpected errors by just logging them
    sql.on('error', (err) => {
      console.error(err)
      sql.end()
    })

    return sql

  }
}

async function releaseConnection (connection) {
  await connection.end()
}

module.exports = {
  init: init(),
  new: newConnection(),
  // close: releaseConnection(connection)
}
