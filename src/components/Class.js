import React, { useState, useEffect } from "react";
import { Button, TextField, Link } from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Student from "./Student";
// import EditStudent from "./EditStudent";

const Class = () => {
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
  const [classTitle, setClassTitle] = useState("History 101");
  const [gender, setGender] = useState("male");
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(testData);
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
      <h1>{classTitle}</h1>

      <div
        className="teachers-container"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <h3 style={{ color: "#0066B3" }}>INSTRUCTORS</h3>
        <Link href="#" color="inherit">
          Teacher 1
        </Link>
        <Link href="#" color="inherit">
          Teacher 2
        </Link>
        <Link href="#" color="inherit">
          Teacher 2
        </Link>
      </div>

      <div className="students-container">
        <h3 style={{ color: "#0066B3" }}>STUDENTS</h3>
        {data.map((s) => {
          return (
            <Student
              name={s.name}
              grade={s.grade}
              onDelete={onDelete}
              onAdd={onAdd}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Class;
