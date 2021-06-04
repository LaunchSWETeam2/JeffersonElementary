import React from 'react';
import {
    InputLabel,
    Select,
} from '@material-ui/core';

export default function GradeDropdown({grade}){
    return(
        <>
            <InputLabel htmlFor="name-input">Grade Level</InputLabel>
            <Select
                native
                defaultValue={grade}
                inputProps={{
                    name: 'gradeLevel',
                    id: 'grade-dropdown',
                }}
                >
                {
                    [...Array(6).fill(1).map((num, index)=>{
                        return(
                            <option key={index} value={index+1}>{index+1}</option>
                        )
                    })]
                }
            </Select>
        </>         
    )
}
