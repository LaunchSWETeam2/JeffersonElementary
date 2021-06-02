import React from 'react'
import '../css/teacher-directory-style.css'

import {
    Button,
    ButtonGroup,
    Input,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

//To do extra:
//Autocomplete search
//Idea: Scrape uva profs

//note: subject will be a list
const testData=[
    {
        name:"Samuel Walters",
        grade: "Applied Math",
        GPA: 3.2,
        gender:"Female",
        DOB: "1/1/2012",
    },{
        name:"Shaun Poole",
        grade: "Applied Math",
        GPA: 3.2,
        gender:"Male",
        DOB: "2/2/2012",
    },
    {
        name:"Myrtle Griffith",
        grade: "Computer Science",
        GPA: 3.4,
        gender:"Male",
        DOB: "3/3/2012",
    },
    {
        name:"Vickie Bennett",
        grade: "Computer Science",
        GPA: 3.2,
        gender:"Male",
        DOB: "4/4/2012",
    },
    {
        name:"Francis Medina",
        grade: "Computer Science",
        GPA: 3.3,
        gender:"Male",
        DOB: "5/5/2012",
    },
    {
        name:"Felicia Marshall",
        grade: "Psychology",
        GPA: 3.6,
        gender:"Male",
        DOB: "6/6/2012",
    },    
    {
        name:"Tammy Morrison",
        grade: "Art",
        GPA: 4.0,
        gender:"Male",
        DOB: "7/7/2012",
    }
]


function StudentDirectory() {
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
    return (
        <div className="student-directory">
            <h2 className="td__header">Student Directory</h2>
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
                        <div className="column-label">Grade Level</div>
                        <div className="column-label">GPA</div>
                        <div className="spacer"/>
                    </div>
                    {
                        testData.map((student)=>{
                            return(
                                <StudentAccordion student={student}/>             
                            )
                        })
                    }
                </div>
        </div>
    )
}

function StudentAccordion({student}){
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
                    <div className="column-label">{student.name}</div>
                    <div className="column-label">{student.grade}</div>
                    <div className="column-label">{student.GPA}</div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className="accordion-details">
                    <ProfilePic student={student}/>
                    Some extra info in a flexbox or grid... (Gender, DOB, etc)
                </div>
            </AccordionDetails>
        </Accordion>
    )
}

function ProfilePic({student}){
    return(
        <img className="profile-pic" src="http://placehold.it/100x100"/>
    )
}


export default StudentDirectory
