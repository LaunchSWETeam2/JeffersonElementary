import React, { useState } from 'react';
import AgeDropdown from './AgeDropdown';
import '../css/teacher-directory-style.css';
import {
    Button,
    Radio,
    Checkbox,
    RadioGroup,
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Input,
    InputLabel,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@material-ui/core';
import MuiPhoneNumber from 'material-ui-phone-number';
import axios from 'axios';

const subjectsModel = {math:false, history:false, science:false,
    geography:false, music:false, art:false, health:false}

function StudentForm({handleClose, allFaces, setStudentData, handleSnackOpen, studentEdit}) {

    const [studentForm, setStudentForm] = useState({sexValue:'female', ageValue:20, nameValue:"",
    emailValue:"", phoneValue:"", subjects: subjectsModel})

    const {sexValue, ageValue, nameValue, emailValue, phoneValue, subjects} = studentForm;

    const setStudentFormValue = (attrib, newValue) =>{
        setStudentForm({...studentForm, [attrib]:newValue})
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        const name = e.target["name-input"].value;
        const email = e.target["email-input"].value;
        const phone = e.target["phone-input"].value;
        const age = e.target["age-dropdown"].value;
        const subjectsList = subjectsToList(subjects)
        const sex = sexValue;
        const facesList = allFaces.filter((face)=>face.meta.gender[0] === sexValue);
        const randomFaceURL = (facesList.length > 0) && facesList[Math.floor(Math.random() * facesList.length)].urls[4]["512"];
        //this is poor practice: must have some sort of model that can be reused. Serves as a template
        const studentObj = {
            age:age,
            contact:{email:email, phone:phone},
            gender:sex,
            name:name,
            subjects:subjectsList,
        }

 
        studentPOST({...studentObj, image:randomFaceURL}) 
        //clean up
        const subjectsReset = {...subjects};
        Object.keys(subjects).forEach(subject=>{
            subjectsReset[subject] = false;
        })
        // setSubjects(subjectsReset)
        setStudentFormValue("subjects", subjectsReset)
        setStudentData(data=> data.concat([studentObj]))//update view
        handleClose()
    }


    const handleSelect = (e) =>{
        setStudentFormValue("subjects", {...subjects, [e.target.name]:e.target.checked})
        // setSubjects({...subjects, [e.target.name]:e.target.checked})
    }
    const handleSexSelect = (e)=>{
        setStudentFormValue("sexValue", e.target.value)
        // setSexValue(e.target.value)
    }
    const subjectsToList = (subjectsJSON) =>{
        return Object.keys(subjectsJSON)
                        .filter(key=>subjectsJSON[key] === true)
                        .map(subject => subject.charAt(0).toUpperCase()+subject.slice(1));
    }

    const listToSubjects = (subjectsList)=>{
        let subjectsJSON = { ...subjectsModel }
        const subjectsListLower = subjectsList.map(subject=>subject.toLowerCase())
        Object.keys(subjectsJSON).forEach(key=>{
            if(subjectsListLower.includes(key)){
                subjectsJSON = {...subjectsJSON, [key]:true}
            }
        })
        return subjectsJSON;

    }

    const studentPOST = (student) =>{
            const url = new URL('http://localhost:8080/students/add')
            axios.post(url, student)
                .then((response)=>{
                    handleSnackOpen("Student added successfully!")
                })
                .catch(err=>{
                    console.log("Student POST error: ", err)
                    handleSnackOpen("Failed to add student")
                })
    }
    
    return (
        <>
        <form onSubmit={handleSubmit}>
            <DialogTitle id="alert-dialog-title">Add New Student</DialogTitle>
            <DialogContent>
                <div className="dialog-form-container">
                    <div className="dialog-form-element">
                        <InputLabel>Name</InputLabel>
                        <Input id="name-input" defaultValue={nameValue} placeholder="Enter Name"/>
                    </div>
                    <div className="dialog-form-element">
                        <InputLabel>Email</InputLabel>
                        <Input id="email-input" defaultValue={emailValue} placeholder="Enter Email"/>
                    </div>
                    <div className="dialog-form-element">
                        <AgeDropdown age={ageValue}/>     
                    </div>
                    <div className="dialog-form-element">
                        <InputLabel htmlFor="name-input">Phone Number</InputLabel>
                        <MuiPhoneNumber id="phone-input" defaultCountry={'us'} value={phoneValue}/>
                    </div>
                    <div className="dialog-form-element">
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Sex</FormLabel>
                            <RadioGroup  id="sex-selector" value={sexValue} onChange={handleSexSelect}>
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="dialog-form-element">
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Select Subjects</FormLabel>
                            <FormGroup>
                                <div className="dialog-form-element">
                                    {
                                        Object.keys(subjects).map((key)=>{
                                            return(
                                                <FormControlLabel
                                                    key={key}
                                                    style={{width:"45%"}}
                                                    control={<Checkbox checked={subjects[key]} onChange={handleSelect} name={key} />}
                                                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </FormGroup>
                        </FormControl>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button type="submit" color="primary" autoFocus>
                    {studentEdit ? 'Update' : 'Add'}
                </Button>
            </DialogActions>
        </form>
    </>
    )
}

export default StudentForm
