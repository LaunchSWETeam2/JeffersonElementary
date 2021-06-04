import React, { useState } from 'react';
import TeacherForm from './TeacherForm';
import TeacherFormEdit from './TeacherFormEdit';
import '../css/teacher-directory-style.css';
import {
    Dialog,
} from '@material-ui/core';
import axios from 'axios';

const subjectsModel = {math:false, history:false, science:false,
    geography:false, music:false, art:false, health:false}

function TeacherDialog({open, handleClose, allFaces, setTeacherData, 
                            handleSnackOpen, teacherEdit, handleAlphaSort}){

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-teacher-dialog-title"
                aria-describedby="alert-teacher-dialog-description"
            >
                {teacherEdit 
                ?<TeacherFormEdit
                    {...{handleClose, allFaces, setTeacherData, handleSnackOpen, teacherEdit}}
                />
                : <TeacherForm
                    {...{handleClose, allFaces, setTeacherData, handleSnackOpen, handleAlphaSort}}
                 />
                }
                
            </Dialog>
        </div>
      );
}

export default TeacherDialog