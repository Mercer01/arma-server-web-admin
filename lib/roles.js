const db = require("./db")

let Roles = function (config) {
    this.config = config
}

Roles.prototype.getallrolesforuser = function (userid,res) {
  const connection = db.init()
  let query = 'SELECT role_id FROM users_roles WHERE user_id = ?'
  connection.query(query,[userid], (err,response) => {
    if(err){
      res.status(500).send(err)
    } else {
      console.log(response)
      res.send(response)
    }
  })
};


module.exports = Roles