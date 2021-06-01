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
    classes.push({
      id: 1,
      title: title,
      start: start,
      end: end,
      type: "event",
      allDay: "false",
    });
    setName("");
    setStart("");
    setEnd("");
    setEvents(classes);
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
