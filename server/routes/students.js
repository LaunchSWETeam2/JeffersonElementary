var express = require("express")
var router = express.Router();

router.get("/students", async (req,res)=>{
    res.send("Students API working properly")
})

module.exports = router;