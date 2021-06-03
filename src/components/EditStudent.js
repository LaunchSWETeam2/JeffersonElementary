import React, { useState } from "react";
import { Button, ButtonGroup, TextField } from "@material-ui/core";

const EditStudent = ({ onAdd, onDelete, setStudentName, setNewGrade }) => {
  const [input, setInput] = useState("");
  const [gradeInput, setGradeInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("Make changes below.");
  const [successChange, setSuccessChange] = useState(false);

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
        setSuccessChange(true);
        setErrorMessage("Updated!");
      } else {
        setSuccessChange(false);
        setErrorMessage("ERROR: Please enter a valid grade");
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
      <p>{errorMessage}</p>
      <TextField
        placeholder="Edit name"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <TextField
        style={{ marginBottom: "10px" }}
        placeholder="Edit grade"
        value={gradeInput}
        onChange={(e) => {
          setGradeInput(e.target.value);
        }}
      />
      <ButtonGroup
        size="small"
        aria-label="small outlined button group"
        style={{ marginBottom: "10px" }}
      >
        <Button
          style={{ background: "green", color: "white" }}
          onClick={onSave}
        >
          Save
        </Button>
        {/* <Button onClick={onAdd}>Add</Button> */}
        <Button
          onClick={onDelete}
          style={{ background: "red", color: "white" }}
        >
          Delete
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default EditStudent;
