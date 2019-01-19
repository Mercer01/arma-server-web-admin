let express = require('express')
let path = require('path')
let cookie = require('cookie-parser')


module.exports = function (RolesManager) {
    let router = express.Router()
    //TODO: confirm if post or get
    router.get("/userroles", async (req,res) => {
        let userid = req.body.userid;
        if(userid === undefined) {
            res.status(400).send({"msg":"Please specify a user id"})
        } else {
            RolesManager.getallrolesforuser(userid,req)
        }  
    })

    return router
}