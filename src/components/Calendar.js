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
  const [deleteEvents, setDelete] = useState([]);
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
  const handleChangeDelete = (e) => {
    setDelete(e.currentTarget.value);
  };
  const deleteEvent = (e) => {
    var id = deleteEvents;
    // e.preventDefault();
    for (var i = 0; i < event.length; i++) {
      if (
        typeof event[i].items != "undefined" &&
        event[i].title === deleteEvents
      ) {
        id = event[i].id;
      }
    }

    // console.log(id);
    fetch(`http://localhost:8080/events/delete/${deleteEvents}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: id }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    setUserInput("");
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
        <Button onClick={handleSubmitEvents}>Set Events</Button>
      </form>
      <form>
        <input
          name="delte"
          placeholder="Title of event to delete"
          value={deleteEvents}
          onChange={handleChangeDelete}
        />
        <Button onClick={deleteEvent}>Delete Event</Button>
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
