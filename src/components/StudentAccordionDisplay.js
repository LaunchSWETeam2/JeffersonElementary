import React, { useEffect, useState } from 'react';
import {
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Checkbox,
    FormControlLabel,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function StudentAccordion({student}){
    const [isSelected, setIsSelected] = useState(false)
    const accordionStyle={
        width:"100%",
        paddingRight:"20px",//based off td__table__columns
    }

    return(
        <>
            <Accordion style={accordionStyle}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{padding:"0px"}}
                >
                    <div className="td__table__columns">
                
                        <div className="column-label">
                            {student.name}
                        </div>
                        <div className="column-label">{student.grade && student.grade}</div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="accordion-container">
                        {/* <img className="profile-pic" src={student.image ? student.image : ""} /> */}
                        <div className="accordion-details">
                            <h4>Age: {student.age}</h4>
                            <h4>Gender: {student.gender}</h4>
                            <h4>Grade Level: {student.gradeLevel}</h4>
                            <h4>Email: {student.contact && student.contact.email}</h4>
                            {/* <h4>Phone: {student.contact && student.contact.phone}</h4> */}
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default StudentAccordion