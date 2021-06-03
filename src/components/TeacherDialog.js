import React, { useState } from 'react';
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
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Select,
} from '@material-ui/core';
import MuiPhoneNumber from 'material-ui-phone-number';
import axios from 'axios';

const subjectsModel = {math:false, history:false, science:false,
    geography:false, music:false, art:false, health:false}

function TeacherDialog({open, handleClose, allFaces, setTeacherData, handleSnackOpen, ...props}){
    const { teacher, isUpdating } = props;
    const [teacherForm, setTeacherForm] = useState({sexValue:'female', ageValue:20, nameValue:"",
                                            emailValue:"", phoneValue:"", subjects: subjectsModel})
    const {sexValue, ageValue, nameValue, emailValue, phoneValue, subjects} = teacherForm;
    // const [sexValue, setSexValue] = useState('female');
    // const [ageValue, setAgeValue] = useState(20);
    // const [nameValue, setNameValue] = useState("");
    // const [emailValue, setEmailValue] = useState("");
    // const [phoneValue, setPhoneValue] = useState("");
    // const [subjects, setSubjects] = useState({math:false, history:false, science:false,
    // geography:false, music:false, art:false, health:false})
    
    const setTeacherFormValue = (attrib, newValue) =>{
        setTeacherForm({...teacherForm, [attrib]:newValue})
    }

    const handleSelect = (e) =>{
        setTeacherFormValue("subjects", {...subjects, [e.target.name]:e.target.checked})
        // setSubjects({...subjects, [e.target.name]:e.target.checked})
    }
    const handleSexSelect = (e)=>{
        setTeacherFormValue("sexValue", e.target.value)
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
        const teacherObj = {
            age:age,
            contact:{email:email, phone:phone},
            gender:sex,
            name:name,
            subjects:subjectsList,
        }

        if(teacher){
            teacherPUT({...teacherObj, id:teacher.id})
            console.log("TEACHER PUT")
        }
        else{
            teacherPOST({...teacherObj, image:randomFaceURL}) 
            console.log("TEACHER POST")
        }
        //clean up
        const subjectsReset = {...subjects};
        Object.keys(subjects).forEach(subject=>{
            subjectsReset[subject] = false;
        })
        // setSubjects(subjectsReset)
        setTeacherFormValue("subjects", subjectsReset)
        setTeacherData(data=> data.concat([teacherObj]))//update view
        handleClose()
    }

    const teacherPOST = (teacher) =>{
            const url = new URL('http://localhost:8080/teachers/add')
            axios.post(url, teacher)
                .then((response)=>{
                    handleSnackOpen("Teacher added successfully!")
                })
                .catch(err=>{
                    console.log("Teacher POST error: ", err)
                    handleSnackOpen("Failed to add teacher")
                })
    }

    const teacherPUT = (teacherAndId) =>{
        const url = new URL('http://localhost:8080/teachers/update')
        axios.put(url, teacherAndId)
            .then()
            .catch()
    }
    const formHTML = () =>{
        let formValues = {name:nameValue, email: emailValue, age: ageValue,
                                phone:phoneValue, sex:sexValue, subjects: subjects }
        
        //populates form with teacher's values if edit mode
        if(teacher){
            const teacherSubjects = listToSubjects(teacher.subjects);
            formValues = {...formValues, name:teacher.name, email:teacher.contact.email,
                            age: teacher.age, phone: teacher.contact.phone, sex:teacher.gender, subjects:teacherSubjects }//find a better way later with some sort of reusable, scalable model
        }  
        return(
            <>
                <DialogTitle id="alert-dialog-title">Add New Teacher</DialogTitle>
                <DialogContent>
                    <div className="dialog-form-container">
                        <div className="dialog-form-element">
                            <InputLabel>Name</InputLabel>
                            <Input id="name-input" defaultValue={formValues.name} placeholder="Enter Name"/>
                        </div>
                        <div className="dialog-form-element">
                            <InputLabel>Email</InputLabel>
                            <Input id="email-input" defaultValue={formValues.email} placeholder="Enter Email"/>
                        </div>
                        <div className="dialog-form-element">
                            <AgeDropdown age={formValues.age}/>     
                        </div>
                        <div className="dialog-form-element">
                            <InputLabel htmlFor="name-input">Phone Number</InputLabel>
                            <MuiPhoneNumber id="phone-input" defaultCountry={'us'} value={formValues.phone}/>
                        </div>
                        <div className="dialog-form-element">
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Sex</FormLabel>
                                <RadioGroup  id="sex-selector" value={formValues.sex} onChange={handleSexSelect}>
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
                                            Object.keys(formValues.subjects).map((key)=>{
                                                return(
                                                    <FormControlLabel
                                                        key={key}
                                                        style={{width:"45%"}}
                                                        control={<Checkbox checked={formValues.subjects[key]} onChange={handleSelect} name={key} />}
                                                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                                                    />
                                                )
                                            })
                                        }
                                    </div>
                                </FormGroup>
                            </FormControl>
                        </div>
                        {/* <div className="dialog-form-element">
                            Upload image button coming soon....
                        </div> */}
                    </div>
                </DialogContent>
            </>
        )
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-teacher-dialog-title"
                aria-describedby="alert-teacher-dialog-description"
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle id="alert-dialog-title">Add New Teacher</DialogTitle>
                    <DialogContent>
                        {formHTML()}
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary" autoFocus>
                        {isUpdating ? 'Update' : 'Add'}
                    </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
      );
}

function AgeDropdown({age}){
    return(
        <>
            <InputLabel htmlFor="name-input">Age</InputLabel>
            <Select
                native
                defaultValue={age}
                inputProps={{
                    name: 'age',
                    id: 'age-dropdown',
                }}
                >
                {
                    [...Array(100).fill(1).map((num, index)=>{
                        return(
                            <option key={index} value={index+1}>{index+1}</option>
                        )
                    })]
                }
            </Select>
        </>         
    )
}

export default TeacherDialog