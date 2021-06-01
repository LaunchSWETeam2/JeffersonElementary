import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import React, { useRef, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getEvents } from "./fetch";
const localizer = momentLocalizer(moment);

function CalendarApp() {
  const [data, setData] = useState("");
  const [userInput, setUserInput] = useState("");
  const [event, setEvents] = useState([]);
  const classes = [];
  classes.push({
    id: 1,
    title: "history101",
    start: new Date("June 1, 2021 05:24:00"),
    end: "June 1, 2021 05:40:00",
    type: "holiday",
    allDay: "false",
  });
  const setEvent = (events) => {
    setEvents(events);
  };
  return (
    <div>
      <Button onClick={() => setEvent(classes)}>Set Events</Button>
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
