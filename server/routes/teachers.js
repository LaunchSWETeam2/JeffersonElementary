var express = require("express")
var router = express.Router();

router.get("/teachers", async (req,res)=>{
    res.send("Teachers API working properly")
})

module.exports = router;