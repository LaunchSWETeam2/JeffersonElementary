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

function StudentAccordion({student, selectMode, selected,
     setSelected, handleEditOpen}){
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
                        <div className="column-label">{student.subjects && student.subjects.join(", ")}</div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="accordion-container">
                        <img className="profile-pic" src={student.image ? student.image : ""} />
                        <div className="accordion-details">
                            <h4>Age: {student.age}</h4>
                            <h4>Gender: {student.gender}</h4>
                            {/* <h4>Rating: {student.rating}</h4> */}
                            <h4>Email: {student.contact && student.contact.email}</h4>
                            <h4>Phone: {student.contact && student.contact.phone}</h4>
                            <Button onClick={()=>handleEditOpen(student)}style={{width:"100%",height:"25px"}}variant="contained">Edit</Button>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default StudentAccordion