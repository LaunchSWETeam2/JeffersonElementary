import React, { useEffect, useState } from 'react';
import '../css/teacher-directory-style.css';
import {
    Button,
    ButtonGroup,
    Input,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import axios from 'axios';
//To do extra:
//Autocomplete search
//Idea: Scrape uva profs

const FACE_API_KEY = process.env.REACT_APP_FACE_API_KEY;
const placeholderImg = "https://images.generated.photos/qo-JFI66icV5qr_zT06omPDFsc179J8FhKR3ZoxopQo/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA4ODg2NDRfMDE1/MjU1NV8wODIwNTgz/LmpwZw.jpg"
function TeacherDirectory() {
    const [teacherData, setTeacherData] = useState([])
    const [faceUrl, setFaceURL] = useState("")
    const buttonGroupStyle={
        backgroundColor:"#004981",
        borderWidth:"0px",
        fontWeight:"bold",
        color:"white",
    }
    const InputStyle={
        backgroundColor:"#E5E5E5",
        borderRadius:"10px",
        padding:"5px",
    }

    useEffect(()=>{
        fetchTeacherData()
        // fetchFace()//only 50 requests. Store data while you can...
    }, [])

    const fetchTeacherData = () =>{
        const url = new URL("http://localhost:8080/teachers/read");
        axios.get(url.toString())
            .then(response=>{
                setTeacherData(response.data)
            })
            .catch(err=>{
                console.log("Fetch Teacher Error: ", err)
            })
    }

    const fetchFace = () =>{
        const url = new URL("https://api.generated.photos/api/v1/faces");
        url.searchParams.append('api_key', FACE_API_KEY)
        url.searchParams.append("order_by", 'random')
        url.searchParams.append('per_page', 10)
        url.searchParams.append('age','young-adult')
        console.log(url.toString())
        axios.get(url)
            .then(response=>{
                const face = response.data.faces[0].urls[4]["512"]
                setFaceURL(face)
            })
            .catch(err=>{
                console.log("Fetch Face Error: ", err)
            })
    }

    return (
        <div className="teacher-directory">
            <h2 className="td__header">Teacher Directory</h2>
                <div className="td__controller">
                    <div className="td__controller__search">
                        <Input style={InputStyle} disableUnderline={true} id="teacher-search-input"  placeholder="Search Name"/>
                        <Button><SearchIcon/></Button>
                    </div>
                    <ButtonGroup variant="contained" aria-label="teacher-directory-controls">
                        <Button style={buttonGroupStyle}>Add</Button>
                        <Button style={buttonGroupStyle}>Select</Button>
                        <Button style={buttonGroupStyle}>Delete</Button>
                    </ButtonGroup>
                </div>
                <div className="td__table">
                    <div className="td__table__columns color-theme">
                        <div className="column-label">Name</div>
                        <div className="column-label">Subject(s)</div>
                        <div className="spacer"/>
                    </div>
                    {
                        teacherData.map((teacher)=>{
                            return(
                                <TeacherAccordion key={teacher.id} teacher={teacher} faceUrl={placeholderImg}/>             
                            )
                        })
                    }
                </div>
        </div>
    )
}

function TeacherAccordion({teacher, faceUrl}){
    const accordionStyle={
        width:"100%",
        paddingRight:"20px",//based off td__table__columns
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
                    <div className="column-label">{teacher.name}</div>
                    <div className="column-label">{teacher.subjects.join(", ")}</div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <ProfilePic pic={faceUrl}/>
                <div className="accordion-details">
                    <h4>Age: {teacher.age}</h4>
                    <h4>Gender: {teacher.gender}</h4>
                    <h4>Rating: {teacher.rating}</h4>
                    <h4>Email: {teacher.contact.email}</h4>
                    <h4>Phone: {teacher.contact.phone}</h4>
                </div>
            </AccordionDetails>
        </Accordion>
    )
}

function ProfilePic({pic}){
    return(
        <img className="profile-pic" src={pic}/>
    )
}


export default TeacherDirectory
