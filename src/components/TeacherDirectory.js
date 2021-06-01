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
        name:"Megan Ryals",
        subject: "Applied Math",
        avgGPA: 3.2,
        gender:"Female",
    },{
        name:"Christopher Hellings",
        subject: "Applied Math",
        avgGPA: 3.2,
        gender:"Male",
    },
    {
        name:"Mark Sheriff",
        subject: "Computer Science",
        avgGPA: 3.4,
        gender:"Male",
    },
    {
        name:"Aaron Bloomfield",
        subject: "Computer Science",
        avgGPA: 3.2,
        gender:"Male",
    },
    {
        name:"Nathan Brunelle",
        subject: "Computer Science",
        avgGPA: 3.3,
        gender:"Male",
    },
    {
        name:"Christopher Mauzrek",
        subject: "Psychology",
        avgGPA: 3.6,
        gender:"Male",
    },    
    {
        name:"Bob Ross",
        subject: "Art",
        avgGPA: 4.0,
        gender:"Male",
    }
]


function TeacherDirectory() {
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
                        <div className="column-label">Average GPA</div>
                        <div className="spacer"/>
                    </div>
                    {
                        testData.map((teacher)=>{
                            return(
                                <TeacherAccordion teacher={teacher}/>             
                            )
                        })
                    }
                </div>
        </div>
    )
}

function TeacherAccordion({teacher}){
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
                    <div className="column-label">{teacher.subject}</div>
                    <div className="column-label">{teacher.avgGPA}</div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className="accordion-details">
                    <ProfilePic teacher={teacher}/>
                    Some extra info in a flexbox or grid...
                </div>
            </AccordionDetails>
        </Accordion>
    )
}

function ProfilePic({teacher}){
    return(
        <img className="profile-pic" src="http://placehold.it/100x100"/>
    )
}


export default TeacherDirectory
