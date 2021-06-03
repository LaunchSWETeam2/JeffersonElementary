import React, { useEffect, useState } from "react";
import "../css/teacher-directory-style.css";
import ClassCreate from "./ClassCreate";
import {
  Button,
  ButtonGroup,
  Input,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const grey = "#E5E5E5";
const blue = "#004981";

//To do extra:
//Autocomplete search
//Idea: Scrape uva profs

//note: subject will be a list
const testData = [
  {
    name: "Megan Ryals",
    subject: "Applied Math",
    avgGPA: 3.2,
    gender: "Female",
  },
  {
    name: "Christopher Hellings",
    subject: "Applied Math",
    avgGPA: 3.2,
    gender: "Male",
  },
  {
    name: "Mark Sheriff",
    subject: "Computer Science",
    avgGPA: 3.4,
    gender: "Male",
  },
  {
    name: "Aaron Bloomfield",
    subject: "Computer Science",
    avgGPA: 3.2,
    gender: "Male",
  },
  {
    name: "Nathan Brunelle",
    subject: "Computer Science",
    avgGPA: 3.3,
    gender: "Male",
  },
  {
    name: "Christopher Mauzrek",
    subject: "Psychology",
    avgGPA: 3.6,
    gender: "Male",
  },
  {
    name: "Bob Ross",
    subject: "Art",
    avgGPA: 4.0,
    gender: "Male",
  },
];

const subjects = [
  "Science",
  "Math",
  "History",
  "English",
  "Health",
  "Art",
  "Geography",
];
//make grade level(s) a list. There can be multiple classes (with different times or locations)
const classData = [
  { title: "World History", subject: "History", gradeLevel: 1 },
  { title: "US History", subject: "History", gradeLevel: 2 },
  { title: "East Asian History", subject: "History", gradeLevel: 3 },
  { title: "Indian History", subject: "History", gradeLevel: 4 },
  { title: "Basic Arithmetic", subject: "Math", gradeLevel: 2 },
  { title: "Advanced Math", subject: "Math", gradeLevel: 6 },
  { title: "Art 101", subject: "Art", gradeLevel: 2 },
  { title: "Art 201", subject: "Art", gradeLevel: 3 },
  { title: "Art 301", subject: "Art", gradeLevel: 4 },
  { title: "Art 401", subject: "Art", gradeLevel: 5 },
  { title: "Physical Health", subject: "Health", gradeLevel: 6 },
  { title: "Soccer", subject: "Health", gradeLevel: 6 },
  { title: "Sex Ed", subject: "Health", gradeLevel: 6 },
  { title: "Nutrition", subject: "Health", gradeLevel: 6 },
  { title: "World Geography", subject: "Geography", gradeLevel: 3 },
  { title: "Chemistry", subject: "Science", gradeLevel: 3 },
  { title: "Physics", subject: "Science", gradeLevel: 3 },
  { title: "Physics", subject: "Science", gradeLevel: 3 },
  { title: "Physics", subject: "Science", gradeLevel: 3 },
  { title: "Physics", subject: "Science", gradeLevel: 3 },
  { title: "Physics", subject: "Science", gradeLevel: 3 },
  { title: "English 101", subject: "English", gradeLevel: 3 },
  { title: "English 201", subject: "English", gradeLevel: 2 },
  { title: "English 301", subject: "English", gradeLevel: 1 },
  { title: "English 401", subject: "English", gradeLevel: 5 },
  { title: "English 501", subject: "English", gradeLevel: 6 },
  { title: "English 601", subject: "English", gradeLevel: 2 },
  { title: "English 701", subject: "English", gradeLevel: 3 },
  { title: "English 801", subject: "English", gradeLevel: 4 },
  { title: "World Geography 2", subject: "Geography", gradeLevel: 3 },
];

function ClassDirectory() {
  const buttonGroupStyle = {
    backgroundColor: blue,
    borderWidth: "0px",
    fontWeight: "bold",
    color: "white",
  };
  const InputStyle = {
    backgroundColor: grey,
    borderRadius: "10px",
    padding: "5px",
  };

  const axios = require('axios');
  const [classList, setClassList] = useState([]);

  useEffect(() => {
      const url = new URL("http://localhost:8080/classes/read");

      axios.get(url)
      .then(function (response) {
          setClassList(response.data);
      })
      .catch(function (error) {
          console.log(error);
      })
      .then(function () {
      });
  }, []);

  return (
    <div className="teacher-directory">
      <h2 className="td__header">Class Directory</h2>
      <div className="td__controller">
        <div className="td__controller__search">
          <ClassCreate />
          <Input
            style={InputStyle}
            disableUnderline={true}
            id="teacher-search-input"
            placeholder="Search Name"
          />
          <Button>
            <SearchIcon />
          </Button>
        </div>
      </div>
      <div className="td__table">
        {classList.length !== 0 && 
            subjects.map((subject) => {
                //const classes = classData.filter((aClass) => aClass.subject === subject
                var classes = [];
                for (var i = 0; i < classList.length; i++) {
                    if (classList[i].Subject === subject) {
                        classes.push(classList[i].Title);
                    }
                }
                return <ClassAccordion {...{ subject, classes }} />;
            })
        }
      </div>
    </div>
  ); /** <ButtonGroup
  variant="contained"
  aria-label="teacher-directory-controls"
>
  <Button style={buttonGroupStyle}>Add</Button>
  <Button style={buttonGroupStyle}>Select</Button>
  <Button style={buttonGroupStyle}>Delete</Button>
</ButtonGroup> */
}

function ClassAccordion({ subject, classes }) {
  const accordionStyle = {
    width: "100%",
    paddingRight: "20px", //based off td__table__columns
  };
  const classButtonStyle = {
    width: "100%",
    padding: 0,
    backgroundColor: grey,
    color: "black",
    padding: "2px",
    paddingLeft: "10px",
    borderRadius: "5px",
    justifyContent: "flex-start",
  };
  return (
    <Accordion style={accordionStyle}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        style={{ padding: "0px" }}
      >
        <div className="td__table__columns">
          <div className="column-label">{subject}</div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="class-container">
          {classes &&
            classes.map((aClass) => {
              return (
                <div className="class-title-container">
                  <div className="class-title-button-container">
                    <Button style={classButtonStyle}>{aClass}</Button>
                  </div>
                </div>
              );
            })}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default ClassDirectory;
