import React, { useState } from 'react';
import AgeDropdown from './AgeDropdown';
import GradeDropDown from './GradeDropDown';
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

function StudentFormEdit({handleClose, setStudentData, handleSnackOpen, studentEdit}) {

    const [studentForm, setStudentForm] = useState({sexValue:studentEdit.gender, ageValue:studentEdit.age, nameValue:studentEdit.name,
    emailValue:studentEdit.contact.email, phoneValue:studentEdit.contact.phone, gradeValue:studentEdit.gradeLevel})

    const {sexValue, ageValue, nameValue, emailValue, phoneValue, gradeValue} = studentForm;

    const setStudentFormValue = (attrib, newValue) =>{
        setStudentForm({...studentForm, [attrib]:newValue})
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        const name = e.target["name-input"].value;
        const email = e.target["email-input"].value;
        const phone = e.target["phone-input"].value;
        const age = e.target["age-dropdown"].value;
        const grade = e.target["grade-dropdown"].value;
        //const subjectsList = subjects.map(subject => subject.charAt(0).toUpperCase()+subject.slice(1));;
        const sex = sexValue;
        //this is poor practice: must have some sort of model that can be reused. Serves as a template
        const studentObj = {
            age:age,
            contact:{email:email, phone:phone},
            gender:sex,
            name:name,
            gradeLevel:grade
            //subjects:subjectsList
        }

        studentPUT({...studentObj, id:studentEdit.id})
    
        //clean up
        /*const subjectsReset = {...subjects};
        Object.keys(subjects).forEach(subject=>{
            subjectsReset[subject] = false;
        })*/
        // setSubjects(subjectsReset)
        //setStudentFormValue("subjects", subjectsReset)
        setStudentData(data=> data.map(student=>{
            if(student.id ===studentEdit.id){
                return {...studentObj};
            }
            return student;
        }))//update view
        handleClose()
    }


    const handleSelect = (e) =>{
        /*if(e.target.checked === true){
            setStudentFormValue("subjects", subjects.concat([e.target.name.toLowerCase()]))
        }
        else{
            setStudentFormValue("subjects", subjects.filter(subject => subject.toLowerCase() !==e.target.name.toLowerCase()))
        }*/
    }
    const handleSexSelect = (e)=>{
        setStudentFormValue("sexValue", e.target.value)
    }

    const listToSubjects = (subjectsList)=>{
        /*let subjectsJSON = { ...subjectsModel }
        const subjectsListLower = subjectsList.map(subject=>subject.toLowerCase())
        Object.keys(subjectsJSON).forEach(key=>{
            if(subjectsListLower.includes(key)){
                subjectsJSON = {...subjectsJSON, [key]:true}
            }
        })
        return subjectsJSON;*/

    }

    const studentPUT = (studentAndId) =>{
        const url = new URL('http://localhost:8080/students/update')
        axios.put(url, studentAndId)
            .then(()=>{
                handleSnackOpen("Student edited successfully!")
            })
            .catch(err=>{
                console.log("Student PUT error: ", err)
                handleSnackOpen("Failed to edit student")
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
                        <GradeDropDown grade={gradeValue}/>     
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
                    {/* <div className="dialog-form-element">
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Select Subjects</FormLabel>
                            <FormGroup>
                                <div className="dialog-form-element">
                                    {
                                        Object.keys(listToSubjects(subjects)).map((key)=>{
                                            return(
                                                <FormControlLabel
                                                    key={key}
                                                    style={{width:"45%"}}
                                                    control={<Checkbox checked={listToSubjects(subjects)[key]} onChange={handleSelect} name={key} />}
                                                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </FormGroup>
                        </FormControl>
                    </div> */}
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

export default StudentFormEdit
