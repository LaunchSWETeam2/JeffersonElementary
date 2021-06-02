var express = require("express")
var router = express.Router();

router.get("/", async (req,res)=>{
    res.send("Classes API working properly")
})

module.exports = router;