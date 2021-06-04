import React, { useState } from 'react';
import StudentForm from './StudentForm';
import StudentFormEdit from './StudentFormEdit';
import '../css/teacher-directory-style.css';
import {
    Dialog,
} from '@material-ui/core';
import axios from 'axios';

const subjectsModel = {math:false, history:false, science:false,
    geography:false, music:false, art:false, health:false}

function StudentDialog({open, handleClose, allFaces, setStudentData, handleSnackOpen, studentEdit}){
    // const [studentForm, setStudentForm] = useState({sexValue:'female', ageValue:20, nameValue:"",
    //                                         emailValue:"", phoneValue:"", subjects: subjectsModel})

    console.log(studentEdit)                    
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-teacher-dialog-title"
                aria-describedby="alert-teacher-dialog-description"
            >
                {studentEdit 
                ?<StudentFormEdit
                    {...{handleClose, allFaces, setStudentData, handleSnackOpen, studentEdit}}
                />
                : <StudentForm
                    {...{handleClose, allFaces, setStudentData, handleSnackOpen}}
                 />
                }
                
            </Dialog>
        </div>
      );
}

export default StudentDialog