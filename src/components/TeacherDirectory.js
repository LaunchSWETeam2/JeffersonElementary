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
const testData=[
    {
        name:"Megan Ryals",
        subject: "Applied Math",
        avgGPA: 3.2,
    }
]


function TeacherDirectory() {
    return (
        <div className="teacher-directory">
            <h2 className="td__header">Teacher Directory</h2>
                <div className="td__controller">
                    <div className="td__controller__search">
                        <Input id="teacher-search-input"  placeholder="Enter Name"/>
                        <Button><SearchIcon/></Button>
                    </div>
                    <ButtonGroup variant="contained" color="default" aria-label="teacher-directory-controls">
                        <Button>Add</Button>
                        <Button>Select</Button>
                        <Button>Delete</Button>
                    </ButtonGroup>
                </div>
                <div className="td__table">
                    <div className="td__table__columns">
                        <div className="column-label">Name</div>
                        <div className="column-label">Subject(s)</div>
                        <div className="column-label">Average GPA</div>
                    </div>
                    <TeacherAccordion/>             
                </div>
        </div>
    )
}

function TeacherAccordion(props){
    const accordionStyle={
        width:"100%",
        paddingRight:"20px"//based off td__table__columns
    }
    return(
        <Accordion style={accordionStyle}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography >Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
            </Typography>
            </AccordionDetails>
        </Accordion>
    )
}

export default TeacherDirectory
