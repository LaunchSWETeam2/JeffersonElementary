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

function TeacherDialog({open, handleClose}){
    const [sexValue, setSexValue] = useState('female');
    const [subjects, setSubjects] = useState({math:false, history:false, science:false,
    geography:false, music:false, art:false, health:false})

    const handleSelect = (e) =>{
        console.log(e.target.value)
    }
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-teacher-dialog-title"
                aria-describedby="alert-teacher-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Add New Teacher</DialogTitle>
                <DialogContent>
                    <div className="dialog-form-container">
                        <div className="dialog-form-element">
                            <InputLabel htmlFor="name-input">Name</InputLabel>
                            <Input id="name-input" placeholder="Enter Name"/>
                        </div>
                        <div className="dialog-form-element">
                            <InputLabel htmlFor="name-input">Email</InputLabel>
                            <Input id="Email-input" placeholder="Enter Email"/>
                        </div>
                        <div className="dialog-form-element">
                            <AgeDropdown/>     
                        </div>
                        <div className="dialog-form-element">
                            <InputLabel htmlFor="name-input">Phone Number</InputLabel>
                            <MuiPhoneNumber defaultCountry={'us'} onChange={()=>{}}/>
                        </div>
                        <div className="dialog-form-element">
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" value={sexValue} onChange={()=>{}}>
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
                                                            control={<Checkbox checked={subjects.key} onChange={handleSelect} name="gilad" />}
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
                <Button onClick={handleClose} color="primary" autoFocus>
                    Add
                </Button>
                </DialogActions>
            </Dialog>
        </div>
      );
}

function AgeDropdown(){
    return(
        <>
            <InputLabel htmlFor="name-input">Age</InputLabel>
            <Select
                native
                value={10}
                onChange={()=>{}}
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