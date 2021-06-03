import React, { useState, useEffect } from "react";
import { Button, TextField, Link } from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Student from "./Student";

import {useParams} from 'react-router-dom';
// import EditStudent from "./EditStudent";

const Class = () => {
  var classID = useParams();
  const testData = [
    {
      name: "Megan Ryals",
      grade: "A",
      gender: "Female",
    },
    {
      name: "Christopher Hellings",
      grade: "A",
      gender: "Male",
    },
    {
      name: "Mark Sheriff",
      grade: "A",
      gender: "Male",
    },
    {
      name: "Aaron Bloomfield",
      grade: "A",
      gender: "Male",
    },
    {
      name: "Nathan Brunelle",
      grade: "A",
      gender: "Male",
    },
    {
      name: "Christopher Mauzrek",
      grade: "A",
      gender: "Male",
    },
    {
      name: "Bob Ross",
      grade: "A",
      gender: "Male",
    },
  ];
  const [classTitle, setClassTitle] = useState("");
  const [gender, setGender] = useState("male");
  const [data, setData] = useState([]);

  const axios = require('axios');
  const [classObj, setClassObj] = useState(null);

  useEffect(() => {
    console.log("lfskdjfds");
    const url = new URL("http://localhost:8080/classes/read");

    axios.get(url)
    .then(function (response) {
      //console.log(response);
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
  }, []);

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
          <h1>{classObj.Title}</h1>

          <div
            className="teachers-container"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <h3 style={{ color: "#0066B3" }}>INSTRUCTOR</h3>
            <p>{classObj.Teacher}</p>
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

          <div className="students-container">
            <h3 style={{ color: "#0066B3" }}>STUDENTS</h3>
            {classObj.Students.map((s) => {
              return (
                <Student
                  name={s}
                  //grade={s.gradeLevel}
                  onDelete={onDelete}
                  onAdd={onAdd}
                />
              );
            })}
          </div>
        </div>
    }
    </div>
  );
};

export default Class;
