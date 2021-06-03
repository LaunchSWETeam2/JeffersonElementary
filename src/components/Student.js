import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";

import EditStudent from "./EditStudent";

const Student = ({ name, grade, onDelete, onAdd }) => {
  const [toggle, setToggle] = useState(false);
  const [studentName, setStudentName] = useState(name);
  const [newGrade, setNewGrade] = useState(grade);

  const changeName = () => {};

  return (
    <div className="student">
      <div
        className="student-header"
        style={{
          display: "flex",
          flexDirection: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <p style={{ width: "20%", textAlign: "left" }}>{name}&nbsp;&nbsp;</p> */}
        <p style={{ width: "15%", textAlign: "left" }}>
          {studentName}&nbsp;&nbsp;
        </p>
        {/* <p style={{ width: "10%" }}>{grade}&nbsp;&nbsp;</p> */}
        <p style={{ width: "10%" }}>{newGrade}&nbsp;&nbsp;</p>

        {!toggle ? (
          <Button
            style={{ background: "#FFBC19", color: "white" }}
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            Edit
          </Button>
        ) : (
          <Button
            style={{ background: "#0066B3", color: "white" }}
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            Done
          </Button>
        )}
      </div>
      {toggle && (
        <EditStudent
          style={{ width: "33%" }}
          setStudentName={setStudentName}
          setNewGrade={setNewGrade}
          onDelete={onDelete}
          onAdd={onAdd}
        />
      )}
    </div>
  );
};

export default Student;
