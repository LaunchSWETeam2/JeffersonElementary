import React, { useState, useEffect } from "react";
import { Button, TextField, Link } from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Student from "./Student";
import ClassStudent from './ClassStudent';
import '../css/class-page.css';

import {useParams} from 'react-router-dom';
// import EditStudent from "./EditStudent";

const Class = () => {
  var classID = useParams();
  const [classTitle, setClassTitle] = useState("");
  const [gender, setGender] = useState("male");
  const [data, setData] = useState([]);

  const axios = require('axios');
  const [classObj, setClassObj] = useState(null);
  const [allStudents, setAllStudents] = useState([])

  useEffect(() => {
    fetchClasses()
    fetchAllStudents()
  }, []);

  const fetchClasses = () =>{
    const url = new URL("http://localhost:8080/classes/read");

    axios.get(url)
    .then(function (response) {
      var classItem = null;
      for (var i = 0; i < response.data.length; i++) {
        if (response.data[i].id === classID.classid) {
          classItem = response.data[i];
        }
      }
      setClassObj(classItem);
    })
    .catch(function (error) {
        console.log(error);
    })
  }

  const fetchAllStudents = () =>{
    const url = new URL("http://localhost:8080/students/read");
    const url2 = new URL("http://localhost:8080/classes/read");

    axios.get(url)
      .then((studentResponse)=>{
        axios.get(url2)
          .then((classResponse)=>{
            const studentIds = classResponse.data.filter((c)=>c.id === classID.classid)[0]
            console.log(classResponse.data)
            console.log(classID)
            if(studentIds){
              const allStudents = studentResponse.data
              const students = getStudentsFromIds(studentIds.StudentIDs,allStudents)
              setAllStudents(students)
            }
          })
        // setAllStudents(response.data)
        // console.log(response.data)
      })
      .catch(err=>{
        console.log("Error fetching students: ", err)
      })
  }

  const getStudentsFromIds = (studentIds, students) =>{
    return students.filter((student)=>studentIds.includes(student.id))
  }

  const onDelete = (e) => {
    e.preventDefault();
    alert("deleted");
  };
  const onAdd = (e) => {
    e.preventDefault();
    alert("added");
  };

  return (
    <div className="mainDisplay">
      {classObj !== null && 
        <div>
          <h1 className="title">{classObj.Title}</h1>

          <div
            className="teachers-container"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <h3 className="title label">INSTRUCTOR</h3>
            <h4 className="title">{classObj.Teacher}</h4>
            {/*<Link href="#" color="inherit">
              Teacher 1
            </Link>
            <Link href="#" color="inherit">
              Teacher 2
            </Link>
            <Link href="#" color="inherit">
              Teacher 2
      </Link>*/}
          </div>

          <div className="teacher-directory">
            <h3 className="title label">STUDENTS</h3>
            <div className="td__table__columns color-theme">
                        <div className="column-label">
                            Name
                        </div>                        
                        <div className="column-label">Course Grade</div>
                        <div className="spacer"/>
                    </div>
            {allStudents.map((s)=>{
              return(
                <ClassStudent student={s}/>
              )
            })}
            {/* {classObj.Students.map((s) => {
              return (
                <Student
                  name={s}
                  //grade={s.gradeLevel}
                  onDelete={onDelete}
                  onAdd={onAdd}
                />
              );
            })} */}
          </div>
        </div>
    }
    </div>
  );
};

export default Class;
