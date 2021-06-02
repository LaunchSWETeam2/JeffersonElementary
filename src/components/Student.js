import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";

import EditStudent from "./EditStudent";

const Student = ({ name, setName, onDelete, onAdd }) => {
  const [toggle, setToggle] = useState(false);
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
        <p>{name}&nbsp;&nbsp;</p>
        <Button
          style={{ background: "green", color: "white" }}
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          Edit
        </Button>
      </div>
      {toggle && <EditStudent onDelete={onDelete} onAdd={onAdd} />}
    </div>
  );
};

export default Student;
