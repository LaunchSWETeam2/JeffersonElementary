var db = require('../firebase')
const teachersRef = db.collection('teachers')
var express = require("express")
var router = express.Router();

router.get("/",(req,res)=>{
    res.send("Teachers API working properly")
})

module.exports = router;