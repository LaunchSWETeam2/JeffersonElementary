import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import React, { useRef, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function CalendarApp() {
  const [data, setData] = useState("");
  const [userInput, setUserInput] = useState("");
  const [event, setEvents] = useState([]);
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [classes, setClasses] = useState([]);

  const createEvent = (title, start, end) => {
    var val = {
      id: 1,
      title: title,
      start: start,
      end: end,
      type: "event",
      allDay: "true",
    };

    var data = JSON.stringify(val);
    var string = val.toString();
    console.log(string);
    console.log(data);
    fetch(`http://localhost:8080/events/add`, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => console.log(result));

    setName("");
    setStart("");
    setEnd("");
    setEvents(classes);
  };
  const handleSubmitEvents = () => {
    fetch(`http://localhost:8080/events/read`)
      .then((res) => res.json())
      .then((data) => setEvents(data));
  };
  const handleChange = (e) => {
    setName(e.currentTarget.value);
  };
  const handleChangeStart = (e) => {
    setStart(e.currentTarget.value);
  };
  const handleChangeEnd = (e) => {
    setEnd(e.currentTarget.value);
  };
  return (
    <div>
      <Button onClick={handleSubmitEvents}>Set Events</Button>
      <form>
        <input
          name="name"
          placeholder="Event Name"
          value={name}
          onChange={handleChange}
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
        <Button onClick={() => createEvent(name, start, end)}>Add Event</Button>
      </form>
      <Calendar
        localizer={localizer}
        events={event}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        culture="fr"
      />
    </div>
  );
}

export default CalendarApp;
