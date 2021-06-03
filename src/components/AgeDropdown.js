import React from 'react';
import {
    InputLabel,
    Select,
} from '@material-ui/core';

export default function AgeDropdown({age}){
    return(
        <>
            <InputLabel htmlFor="name-input">Age</InputLabel>
            <Select
                native
                defaultValue={age}
                inputProps={{
                    name: 'age',
                    id: 'age-dropdown',
                }}
                >
                {
                    [...Array(100).fill(1).map((num, index)=>{
                        return(
                            <option key={index} value={index+1}>{index+1}</option>
                        )
                    })]
                }
            </Select>
        </>         
    )
}
