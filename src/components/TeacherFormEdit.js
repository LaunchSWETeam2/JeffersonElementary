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

function TeacherFormEdit({handleClose, setTeacherData, handleSnackOpen, teacherEdit}) {

    const [teacherForm, setTeacherForm] = useState({sexValue:teacherEdit.gender, ageValue:teacherEdit.age, nameValue:teacherEdit.name,
    emailValue:teacherEdit.contact.email, phoneValue:teacherEdit.contact.phone, subjects: teacherEdit.subjects})

    const {sexValue, ageValue, nameValue, emailValue, phoneValue, subjects} = teacherForm;

    const setTeacherFormValue = (attrib, newValue) =>{
        setTeacherForm({...teacherForm, [attrib]:newValue})
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        const name = e.target["name-input"].value;
        const email = e.target["email-input"].value;
        const phone = e.target["phone-input"].value;
        const age = e.target["age-dropdown"].value;
        const subjectsList = subjects.map(subject => subject.charAt(0).toUpperCase()+subject.slice(1));;
        const sex = sexValue;
        //this is poor practice: must have some sort of model that can be reused. Serves as a template
        const teacherObj = {
            age:age,
            contact:{email:email, phone:phone},
            gender:sex,
            name:name,
            subjects:subjectsList
        }

        teacherPUT({...teacherObj, id:teacherEdit.id})
    
        //clean up
        const subjectsReset = {...subjects};
        Object.keys(subjects).forEach(subject=>{
            subjectsReset[subject] = false;
        })
        // setSubjects(subjectsReset)
        setTeacherFormValue("subjects", subjectsReset)
        setTeacherData(data=> data.map(teacher=>{
            if(teacher.id ===teacherEdit.id){
                return {...teacherObj, image:teacherEdit.image};
            }
            return teacher;
        }))//update view
        handleClose()
    }


    const handleSelect = (e) =>{
        if(e.target.checked === true){
            setTeacherFormValue("subjects", subjects.concat([e.target.name.toLowerCase()]))
        }
        else{
            setTeacherFormValue("subjects", subjects.filter(subject => subject.toLowerCase() !==e.target.name.toLowerCase()))
        }
    }
    const handleSexSelect = (e)=>{
        setTeacherFormValue("sexValue", e.target.value)
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

    const teacherPUT = (teacherAndId) =>{
        const url = new URL('http://localhost:8080/teachers/update')
        axios.put(url, teacherAndId)
            .then(()=>{
                handleSnackOpen("Teacher edited successfully!")
            })
            .catch(err=>{
                console.log("Teacher PUT error: ", err)
                handleSnackOpen("Failed to edit teacher")
            })
    }
    
    return (
        <>
        <form onSubmit={handleSubmit}>
            <DialogTitle id="alert-dialog-title">Add New Teacher</DialogTitle>
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
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button type="submit" color="primary" autoFocus>
                    {teacherEdit ? 'Update' : 'Add'}
                </Button>
            </DialogActions>
        </form>
    </>
    )
}

export default TeacherFormEdit
