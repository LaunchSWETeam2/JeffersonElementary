import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";

const EditStudent = ({ onAdd, onDelete, setStudentName, setNewGrade }) => {
  const [input, setInput] = useState("");
  const [gradeInput, setGradeInput] = useState("");

  const onSave = (e) => {
    e.preventDefault();
    if (input && gradeInput) {
      setStudentName(input);
      if (
        gradeInput.length <= 1 &&
        (gradeInput === "A" ||
          gradeInput === "B" ||
          gradeInput === "C" ||
          gradeInput === "D" ||
          gradeInput == "F")
      ) {
        setNewGrade(gradeInput);
      } else {
        alert("Enter a valid grade");
      }
      setInput("");
      setGradeInput("");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextField
        placeholder="Edit name"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <TextField
        placeholder="Edit grade"
        value={gradeInput}
        onChange={(e) => {
          setGradeInput(e.target.value);
        }}
      />
      <span className="edit-buttons">
        <Button onClick={onSave}>Save</Button>
        <Button onClick={onAdd}>Add</Button>
        <Button onClick={onDelete}>Delete</Button>
      </span>
    </div>
  );
};

export default EditStudent;
