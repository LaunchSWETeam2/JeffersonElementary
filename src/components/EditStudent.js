import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";

const EditStudent = ({ onAdd, onDelete }) => {
  return (
    <div>
      <TextField placeholder="Write name" />
      <Button onClick={onAdd}>Add</Button>
      <Button onClick={onDelete}>Delete</Button>
    </div>
  );
};

export default EditStudent;
