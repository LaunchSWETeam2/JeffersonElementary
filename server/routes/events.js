var express = require("express")
var router = express.Router();

router.get("/", async (req,res)=>{
    res.send("Events API working properly")
})

module.exports = router;