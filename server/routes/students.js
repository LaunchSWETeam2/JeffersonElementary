var db = require('../firebase')
const studentsRef = db.collection('students')
var express = require("express")
var router = express.Router();

router.get("/read", async(req,res)=>{
    try{
        const studentsList = [];
        const allStudents = await studentsRef.get();
        allStudents.forEach(doc=>{
            studentsList.push({...doc.data(), id: doc.id})
        })        
        res.send(studentsList)
    }catch(err){
        console.log("Get Error: ", err)
        res.sendStatus(500)
    }
})

router.post("/add", async(req,res)=>{
    try{
        const newStudent = req.body;
        const addStudent = await studentsRef.add(newStudent);
        console.log('Added student with id: ', addStudent.id)
        res.sendStatus(200)
    }catch(err){
        console.log("Add Error: ", err)
        res.sendStatus(500)
    }
})

router.put("/update", async(req,res)=>{
    try{
        const {id, ...editedStudent} = req.body;
        const updateStudent = await studentsRef.doc(id).update(editedStudent)
        console.log("Updated student with id: ", id)
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
        const deleteStudent = await studentsRef.doc(id).delete();
        console.log("Deleted student with id: ", id)
        res.sendStatus(200)
    }catch(err){
        console.log("Error: ", err)
        res.sendStatus(500)
    }
})

module.exports = router;