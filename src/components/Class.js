import React, { useState } from "react";
import { Button, TextField, Link } from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Student from "./Student";
// import EditStudent from "./EditStudent";

const Class = () => {
  const testData = [
    {
      name: "Megan Ryals",
      gender: "Female",
    },
    {
      name: "Christopher Hellings",
      gender: "Male",
    },
    {
      name: "Mark Sheriff",
      gender: "Male",
    },
    {
      name: "Aaron Bloomfield",
      gender: "Male",
    },
    {
      name: "Nathan Brunelle",
      gender: "Male",
    },
    {
      name: "Christopher Mauzrek",
      gender: "Male",
    },
    {
      name: "Bob Ross",
      gender: "Male",
    },
  ];
  const [title, setTitle] = useState("History 101");
  const [name, setName] = useState("Student Name");
  const [grade, setGrade] = useState("A");

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
      <h1>{title}</h1>
      <p>class description</p>

      <hr />

      <div
        className="teachers-container"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <h3>STUDENTS</h3>
        <a href="#">Teacher 1</a>
        <a href="#">Teacher 2</a>
        <a href="#">Teacher 3</a>
      </div>

      <hr />

      <div className="students-container">
        <h3>STUDENTS</h3>
        <h1>{title}</h1>
        {testData.map((s) => {
          return <Student name={s.name} onDelete={onDelete} onAdd={onAdd} />;
          // return <p>{s.name}</p>;
        })}
      </div>
    </div>
  );
};

export default Class;
