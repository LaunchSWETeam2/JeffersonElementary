import React, { useEffect, useState } from 'react';
import StudentDialog from './StudentDialog';
import StudentAccordion from './StudentAccordion';
import '../css/teacher-directory-style.css';
import {
    Button,
    ButtonGroup,
    Input,
    Snackbar 
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import axios from 'axios';
//To do extra:
//Autocomplete search
//Idea: Scrape uva profs
//AI generated faces for profile pics
const darkBlue = "#004981";
const lightBlue = "#6ea8d4";

function StudentDirectory() {
    const [studentData, setStudentData] = useState([])
    const [openForm, setOpenForm] = useState(false)

    //multiple select states
    const [selectMode, setSelectMode] = useState(false)
    const [selected, setSelected] = useState([])

    //update student states
    const [isUpdating, setIsUpdating] = useState(false)
    const [studentEdit, setStudentEdit] = useState(null)

    //yummmy snacc bar
    const [snackState, setSnackState] = useState({
        snackOpen: false,
        vertical: 'top',
        horizontal: 'center',
        message:"Message here"
    });
    const { vertical, horizontal, snackOpen, message } = snackState;

    const baseButtonStyle={
        backgroundColor:darkBlue,
        borderWidth:"0px",
        fontWeight:"bold",
        color:"white",
    }
    const selectButtonStyle={...baseButtonStyle, 
        backgroundColor: selectMode ? lightBlue : darkBlue}
    
    const InputStyle={
        backgroundColor:"#E5E5E5",
        borderRadius:"10px",
        padding:"5px",
    }

    useEffect(()=>{
        fetchStudentData()
        // fetchFace()//only 50 requests. Store data while you can...
    }, [])

    const fetchStudentData = () =>{
        const url = new URL("http://localhost:8080/students/read");
        axios.get(url)
            .then(response=>{
                const studentData = response.data
                setStudentData(studentData)                
            })
            .catch(err=>{
                console.log("Fetch Student Error: ", err)
            })

    }

    const handleDelete = () =>{
        selected.forEach((id, index)=>{
            const url = new URL("http://localhost:8080/students/delete");
            url.searchParams.append('id', id)
            axios.delete(url)
                .then(response=>{
                    if(index === selected.length-1){
                        setStudentData(studentData.filter(data=>selected.includes(data.id) === false))
                        handleSnackOpen("Deletion successful!")
                        setSelected([])
                        setSelectMode(false)
                    }
                })
                .catch(err=>{
                    console.log("Deletion error: ", err)
                    handleSnackOpen("Deletion failed")
                })
        })
    }

    const handleOpenForm = () =>{
        setOpenForm(true)
    }
    
    const handleCloseForm = () =>{
        setOpenForm(false)
        handleEditClose()//for reseting edit mode
    }

    const handleSnackOpen = (message) =>{
        setSnackState({...snackState,  message:message, snackOpen:true });
    }

    const handleSnackClose = () =>{
        setSnackState({ ...snackState, snackOpen: false });
    }

    const toggleSelect = () =>{
        setSelectMode(!selectMode)
    }

    const handleEditOpen = (student) =>{
        setOpenForm(true)
        setIsUpdating(true)
        setStudentEdit(student)
    }
    const handleEditClose = () =>{
        setIsUpdating(false)
        setStudentEdit(null)
    }


    return (
        <div className="teacher-directory">
            <h2 className="td__header">Student Directory</h2>
                <div className="td__controller">
                    <div className="td__controller__search">
                        <Input style={InputStyle} disableUnderline={true} id="teacher-search-input"  placeholder="Search Name"/>
                        <Button><SearchIcon/></Button>
                    </div>
                    <ButtonGroup variant="contained" aria-label="teacher-directory-controls">
                        <Button onClick={handleOpenForm} style={baseButtonStyle}>Add</Button>

                        <StudentDialog 
                            open={openForm} 
                            handleClose={handleCloseForm} 
                            //allFaces={allFaces} 
                            setStudentData={setStudentData}
                            handleSnackOpen={handleSnackOpen}
                            studentEdit={studentEdit}
                        />

                        <Button onClick={toggleSelect} style={selectButtonStyle}>Select</Button>
                        <Button onClick={handleDelete} style={baseButtonStyle}>Delete</Button>
                    </ButtonGroup>
                    <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        open={snackOpen}
                        onClose={handleSnackClose}
                        message={message}
                        key={vertical + horizontal}
                    />
                </div>
                <div className="td__table">
                    <div className="td__table__columns color-theme">
                        <div className="column-label">Name</div>
                        <div className="column-label">Grade Level</div>
                        <div className="spacer"/>
                    </div>
                    {
                        studentData.map((student)=>{
                            return(
                                <StudentAccordion key={student.id}
                                {...{student, selectMode, selected, setSelected, handleEditOpen}}/>             
                            )
                        })
                    }
                </div>
        </div>
    )
}

export default StudentDirectory
