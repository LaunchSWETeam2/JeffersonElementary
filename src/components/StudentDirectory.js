import React, { useEffect, useState } from 'react';
import StudentDialog from './StudentDialog'
import '../css/teacher-directory-style.css';
import {
    Button,
    ButtonGroup,
    Input,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Checkbox,
    FormControlLabel,
    Snackbar 
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import axios from 'axios';
//To do extra:
//Autocomplete search
//Idea: Scrape uva profs
//AI generated faces for profile pics
const darkBlue = "#004981";
const lightBlue = "#6ea8d4";

function StudentDirectory({allFaces}) {
    const [studentData, setStudentData] = useState([])
    const [openForm, setOpenForm] = useState(false)

    const [selectMode, setSelectMode] = useState(false)
    const [selected, setSelected] = useState([])

    //yummmy snacc bar
    const [snackState, setSnackState] = useState({
        snackOpen: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, snackOpen } = snackState;

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
        selected.forEach((id)=>{
            const url = new URL("http://localhost:8080/students/delete");
            url.searchParams.append('id', id)
            axios.delete(url)
        })
        setStudentData(studentData.filter(data=>selected.includes(data.id) === false))
        setSnackState({...snackState, snackOpen:true });
        setSelected([])
        setSelectMode(false)
    }

    const handleOpenForm = () =>{
        setOpenForm(true)
    }
    
    const handleCloseForm = () =>{
        setOpenForm(false)
    }

    const handleSnackClose = () =>{
        setSnackState({ ...snackState, snackOpen: false });
    }

    const toggleSelect = () =>{
        setSelectMode(!selectMode)
    }

    return (
        <div className="student-directory">
            <h2 className="td__header">Student Directory</h2>
                <div className="td__controller">
                    <div className="td__controller__search">
                        <Input style={InputStyle} disableUnderline={true} id="student-search-input"  placeholder="Search Name"/>
                        <Button><SearchIcon/></Button>
                    </div>
                    <ButtonGroup variant="contained" aria-label="student-directory-controls">
                        <Button onClick={handleOpenForm} style={baseButtonStyle}>Add</Button>

                        <StudentDialog 
                            open={openForm} 
                            handleClose={handleCloseForm} 
                            //allFaces={allFaces} 
                            setStudentData={setStudentData}
                        />

                        <Button onClick={toggleSelect} style={selectButtonStyle}>Select</Button>
                        <Button onClick={handleDelete} style={baseButtonStyle}>Delete</Button>
                    </ButtonGroup>
                    <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        open={snackOpen}
                        onClose={handleSnackClose}
                        message={"Deletion successful!"}
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
                                {...{student, selectMode, selected, setSelected}}/>             
                            )
                        })
                    }
                </div>
        </div>
    )
}


function StudentAccordion({student, selectMode, selected, setSelected}){
    const [isSelected, setIsSelected] = useState(false)
    const accordionStyle={
        width:"100%",
        paddingRight:"20px",//based off td__table__columns
    }

    useEffect(()=>{
        getSelected()
    }, [])

    const getSelected = ()=>{
        if(selected.includes(student.id)){
            setIsSelected(true)
        }
        else{
            setIsSelected(false)
        }
    }

    const handleSelect = (e) =>{
        e.stopPropagation()
        const checked = e.target.checked;
        const id = e.target.name;
        setIsSelected(checked)
        if(checked === true){
            setSelected(arr => arr.concat([id]))
            setIsSelected(true)
        }
        else{
           setSelected(arr => arr.filter(elem=> elem !==id))
           setIsSelected(false) 
        }
 
    }
    return(
        <Accordion style={accordionStyle}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                style={{padding:"0px"}}
            >
                <div className="td__table__columns">
              
                    <div className="column-label">
                        {selectMode === true &&
                            <FormControlLabel
                                aria-label="Acknowledge"
                                onClick={handleSelect}
                                onFocus={(event) => event.stopPropagation()}
                                control={<Checkbox checked={isSelected} name={student.id} style={{padding:"0px", paddingLeft:"5px"}} />}
                            />
                        }
                        {student.name}
                    </div>
                    <div className="column-label">{student.gradeLevel}</div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className="accordion-container">
                    {/*<img className="profile-pic" src={student.image} />*/}
                    <div className="accordion-details">
                        <h4>Age: {student.age}</h4>
                        <h4>Gender: {student.gender}</h4>
                        {/* <h4>Rating: {teacher.rating}</h4> */}
                        <h4>Email: {student.contact.email}</h4>
                        <h4>Phone: {student.contact.phone}</h4>
                        <Button style={{width:"100%",height:"25px"}}variant="contained">Edit</Button>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>
    )
}

export default StudentDirectory
