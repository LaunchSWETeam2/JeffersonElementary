var db = require('../firebase')
const teachersRef = db.collection('teachers')
var express = require("express")
var router = express.Router();

router.get("/read", async(req,res)=>{
    try{
        const teachersList = [];
        const allTeachers = await teachersRef.get();
        allTeachers.forEach(doc=>{
            teachersList.push({...doc.data(), id: doc.id})
        })        
        res.send(teachersList)
    }catch(err){
        console.log("Get Error: ", err)
        res.sendStatus(500)
    }
})

router.post("/add", async(req,res)=>{
    try{
        const newTeacher = req.body;
        const addTeacher = await teachersRef.add(newTeacher);
        console.log('Added teacher with id: ', addTeacher.id)
        res.sendStatus(200)
    }catch(err){
        console.log("Add Error: ", err)
        res.sendStatus(500)
    }
})

router.put("/update", async(req,res)=>{
    try{
        const {id, ...editedTeacher} = req.body;
        const updateTeacher = await teachersRef.doc(id).update(editedTeacher)
        console.log("Updated teacher with id: ", id)
        res.sendStatus(200)
    }catch(err){
        console.log("Update Error: ", err)
        res.sendStatus(500)
    }

})

//how to implement this?
// router.put("/update-all", async(req,res)=>{
//     try{
//         const {id, ...editedTeacher} = req.body;
//         const updateTeacher = await teachersRef.doc(id).update(editedTeacher)
//         console.log("Updated teacher with id: ", id)
//         res.sendStatus(200)
//     }catch(err){
//         console.log("Update Error: ", err)
//         res.sendStatus(500)
//     }

// })

router.delete("/delete", async(req,res)=>{
    try{
        const id = req.query.id;
        const deleteTeacher = await teachersRef.doc(id).delete();
        console.log("Deleted book with id: ", id)
        res.sendStatus(200)
    }catch(err){
        console.log("Error: ", err)
        res.sendStatus(500)
    }
})

module.exports = router;