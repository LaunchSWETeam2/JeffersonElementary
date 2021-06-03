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

const FACE_API_KEY = process.env.REACT_APP_FACE_API_KEY;

function TeacherDialog({open, handleClose, allFaces, setTeacherData}){
    const [sexValue, setSexValue] = useState('female');
    const [ageValue, setAgeValue] = useState(20)
    const [subjects, setSubjects] = useState({math:false, history:false, science:false,
    geography:false, music:false, art:false, health:false})

    const handleSelect = (e) =>{
        setSubjects({...subjects, [e.target.name]:e.target.checked})
    }
    const handleSexSelect = (e)=>{
        setSexValue(e.target.value)
    }
    const handleAgeSelect= (e) =>{  
        setAgeValue(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        const name = e.target["name-input"].value;
        const email = e.target["email-input"].value;
        const phone = e.target["phone-input"].value;
        const subjectsList = Object.keys(subjects)
                                .filter(key=>subjects[key] === true)
                                .map(subject => subject.charAt(0).toUpperCase()+subject.slice(1));
        const age = ageValue;
        const sex = sexValue;
        const facesList = allFaces.filter((face)=>face.meta.gender[0] === sexValue);
        const randomFaceURL = facesList[Math.floor(Math.random() * facesList.length)].urls[4]["512"];
        //this is poor practice: must have some sort of model that can be reused. Serves as a template
        const teacherObj = {
            age:age,
            contact:{email:email, phone:phone},
            gender:sex,
            name:name,
            subjects:subjectsList,
            image:randomFaceURL
        }
        teacherPOST(teacherObj) 

        //clean up
        const subjectsReset = {...subjects};
        Object.keys(subjects).forEach(subject=>{
            subjectsReset[subject] = false;
        })
        setSubjects(subjectsReset)
        setTeacherData(data=> data.concat([teacherObj]))//update view
        handleClose()
    }

    const teacherPOST = (teacher) =>{
        const url = new URL('http://localhost:8080/teachers/add')
        axios.post(url, teacher)
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
                        <div className="dialog-form-container">
                            <div className="dialog-form-element">
                                <InputLabel>Name</InputLabel>
                                <Input id="name-input" placeholder="Enter Name"/>
                            </div>
                            <div className="dialog-form-element">
                                <InputLabel>Email</InputLabel>
                                <Input id="email-input" placeholder="Enter Email"/>
                            </div>
                            <div className="dialog-form-element">
                                <AgeDropdown age={ageValue} handleChange={handleAgeSelect}/>     
                            </div>
                            <div className="dialog-form-element">
                                <InputLabel htmlFor="name-input">Phone Number</InputLabel>
                                <MuiPhoneNumber id="phone-input" defaultCountry={'us'}/>
                            </div>
                            <div className="dialog-form-element">
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Sex</FormLabel>
                                    <RadioGroup aria-label="gender" name="gender1" value={sexValue} onChange={handleSexSelect}>
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
                                                                style={{width:"45%"}}
                                                                control={<Checkbox checked={subjects.key} onChange={handleSelect} name={key} />}
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
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary" autoFocus>
                        Add
                    </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
      );
}

function AgeDropdown({age, handleChange}){
    return(
        <>
            <InputLabel htmlFor="name-input">Age</InputLabel>
            <Select
                native
                value={age}
                onChange={handleChange}
                inputProps={{
                    name: 'age',
                    id: 'age-native-simple',
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