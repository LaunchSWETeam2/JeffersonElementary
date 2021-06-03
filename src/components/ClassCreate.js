import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { CallMissedOutgoingOutlined } from "@material-ui/icons";
import React, { useRef, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";

function ClassCreate() {
  const [teacher, setTeacher] = useState("");
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState("");
  const [subject, setSubject] = useState("");
  const [classes, setClasses] = useState([]);
  const [updateTitle, setUpdateTitle] = useState([]);
  const [updateVal, setUpdateVal] = useState([]);
  const [updateType, setUpdateType] = useState([]);
  const [deleteVal, setDelete] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [studentList, setStudentList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [id, setID] = useState("");
  const [classNum, setClassNum] = useState("");
  const [classTitle, setClassTitle] = useState("");
  const handleChange = (e) => {
    setTeacher(e.currentTarget.value);
  };

  const handleChangeStart = (e) => {
    setStart(e.currentTarget.value);
  };
  const handleChangeEnd = (e) => {
    setEnd(e.currentTarget.value);
  };
  const handleChangeUpdate = (e) => {
    setUpdateTitle(e.currentTarget.value);
  };
  const handleChangeType = (e) => {
    setUpdateType(e.currentTarget.value);
  };
  const handleChangeUpdateVal = (e) => {
    setUpdateVal(e.currentTarget.value);
  };
  const handleChangeSubject = (e) => {
    setSubject(e.currentTarget.value);
  };
  const handleChangeStudents = (e) => {
    setStudents(e.currentTarget.value);
  };
  const handleChangeDelete = (e) => {
    setDelete(e.currentTarget.value);
  };
  const handleChangeStudent = (e) => {
    setStudent(e.currentTarget.value);
  };
  const handleChangeClassTitle = (e) => {
    setClassTitle(e.currentTarget.value);
  };
  const handleChangeID = (e) => {
    setID(e.currentTarget.value);
  };
  const handleChangeClassNum = (e) => {
    setClassNum(e.currentTarget.value);
  };
  const addStudent = () => {
    console.log(student);
    students.push(student);
    console.log(students);
  };
  const addTeacher = (val) => {
    setTeacher(val);
  };
  const fetchStudents = () => {
    //  fetch(`http://localhost:8080/students/read`)
    //     .then((res) => res.json())
    //   .then((data) => setStudentList(data));
    var temp = [];
    var stud = {
      name: "John Johny",
    };
    temp.push(stud);
    var stud2 = {
      name: "Mark Rosewater",
    };
    temp.push(stud2);
    var stud3 = {
      name: "Rocky Balboa",
    };
    temp.push(stud3);
    setStudentList(temp);
  };
  const fetchTeachers = () => {
    fetch(`http://localhost:8080/teachers/read`)
      .then((res) => res.json())
      .then((data) => setTeacherList(data));
  };
  const createClasses = (
    teacher,
    subject,
    students,
    start,
    end,
    id,
    classNum,
    classTitle
  ) => {
    var val = {
      Teacher: teacher,
      Subject: subject,
      Students: students,
      Start: start,
      End: end,
      ID: id,
      Classroom: classNum,
      Title: classTitle,
    };

    var data = JSON.stringify(val);
    //var string = val.toString();
    // console.log(string);
    //console.log(data);
    fetch(`http://localhost:8080/classes/add`, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => console.log(result));

    setTeacher("");
    setStart("");
    setEnd("");
    setSubject("");
    setStudents([]);
    setID("");
    setClassNum("");
    setClassTitle("");
    // setClasses(classes);
  };
  const handleSubmitClasses = () => {
    fetch(`http://localhost:8080/classes/read`)
      .then((res) => res.json())
      .then((data) => setClasses(data));
  };
  const deleteClass = (e) => {
    var id = deleteVal;

    // e.prClassesDefault();
    for (var i = 0; i < classes.length; i++) {
      if (
        typeof classes[i].items != "undefined" &&
        classes[i].title === deleteVal
      ) {
        id = classes[i].id;
      }
    }

    // console.log(id);
    fetch(`http://localhost:8080/classes/delete/${deleteVal}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: id }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    setDelete("");
  };
  const updateClasses = (e) => {
    var id = "";
    // e.prClassesDefault();
    for (var i = 0; i < classes.length; i++) {
      if (
        typeof classes[i].items != "undefined" &&
        classes[i].title === updateTitle
      ) {
        id = classes[i].id;
      }
    }

    fetch(`http://localhost:8080/classes/update/${updateTitle}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: updateTitle,
        type: updateType,
        val: updateVal,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    setUpdateTitle("");
    setUpdateType("");
    setUpdateVal("");
  };

  return (
    <div>
      <form>
        <select onChange={handleChangeStudent}>
          {studentList.map((student) => {
            return <option value={student.name}> {student.name} </option>;
          })}
        </select>
        <Button onClick={() => addStudent()}>Add Student</Button>
        <p>
          Students:
          {students.map((c) => (
            <p>{c}</p>
          ))}
        </p>
        <Button onClick={() => fetchStudents()}>Fetch Students</Button>
      </form>
      <form>
        <select onChange={handleChange}>
          {teacherList.map((teacher) => {
            return <option value={teacher.name}> {teacher.name} </option>;
          })}
        </select>

        <input
          name="subject"
          placeholder="Subject"
          value={subject}
          onChange={handleChangeSubject}
        />

        <input
          start="start"
          placeholder="Start Date"
          value={start}
          onChange={handleChangeStart}
        />
        <input
          name="end"
          placeholder="End Date"
          value={end}
          onChange={handleChangeEnd}
        />
        <input
          name="title"
          placeholder="Class Title"
          value={classTitle}
          onChange={handleChangeClassTitle}
        />
        <input
          name="id"
          placeholder="Class ID"
          value={id}
          onChange={handleChangeID}
        />
        <input
          name="num"
          placeholder="Class Room Number"
          value={classNum}
          onChange={handleChangeClassNum}
        />
        <Button
          onClick={() =>
            createClasses(
              teacher,
              subject,
              students,
              start,
              end,
              id,
              classNum,
              classTitle
            )
          }
        >
          Add Class
        </Button>
      </form>
      <Button onClick={() => fetchTeachers()}>Fetch Teachers</Button>
      <form>
        <input
          name="ID_Val"
          placeholder="ID of class that Should Be Updated"
          value={updateTitle}
          onChange={handleChangeUpdate}
        />
        <input
          name="field"
          placeholder="Field to update (Teacher, Subject, Studnets, Start, End)"
          value={updateType}
          onChange={handleChangeType}
        />
        <input
          name="newVal"
          placeholder="What should it be set to?"
          value={updateVal}
          onChange={handleChangeUpdateVal}
        />
        <Button onClick={() => updateClasses()}>Update Class</Button>
      </form>
      <form>
        <input
          name="delete"
          placeholder="ID of class to delete"
          value={deleteVal}
          onChange={handleChangeDelete}
        />
        <Button onClick={() => deleteClass()}>Delete Class</Button>
      </form>

      <Button onClick={handleSubmitClasses}>Display Classes</Button>
      <p>
        {classes.map((c) => (
          <p>
            {c.Title} Taught By {c.Teacher} With Students {c.Students} In Room
            {c.Classroom} With ID {c.ID}
          </p>
        ))}
      </p>
    </div>
  );
}

export default ClassCreate;
