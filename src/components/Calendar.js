import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import React, { useRef, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
const localizer = momentLocalizer(moment);

function CalendarApp() {
  const [event, setEvents] = useState([]);
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [classes, setClasses] = useState([]);
  const [deleteEvents, setDelete] = useState([]);
  const [updateTitle, setUpdateTitle] = useState([]);
  const [updateVal, setUpdateVal] = useState([]);
  const [updateType, setUpdateType] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openU, setOpenU] = React.useState(false);
  const [openD, setOpenD] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenU = () => {
    setOpenU(true);
  };
  const handleClickOpenD = () => {
    setOpenD(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseU = () => {
    setOpenU(false);
  };
  const handleCloseD = () => {
    setOpenD(false);
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
  const handleChangeUpdate = (e) => {
    setUpdateTitle(e.currentTarget.value);
  };
  const handleChangeType = (e) => {
    setUpdateType(e.currentTarget.value);
  };
  const handleChangeUpdateVal = (e) => {
    setUpdateVal(e.currentTarget.value);
  };
  const createEvent = (title, start, end) => {
    var val = {
      id: 1,
      title: title,
      start: new Date(start),
      end: new Date(end),
      type: "event",
      allDay: "false",
    };

    var data = JSON.stringify(val);
    var string = val.toString();
    // console.log(string);
    //console.log(data);
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
    setDelete("");
  };
  const updateEvent = (e) => {
    var id = deleteEvents;
    // e.preventDefault();
    for (var i = 0; i < event.length; i++) {
      if (
        typeof event[i].items != "undefined" &&
        event[i].title === updateTitle
      ) {
        id = event[i].id;
      }
    }

    fetch(`http://localhost:8080/events/update/${updateTitle}`, {
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
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Event
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form>
          <Input
            name="name"
            placeholder="Event Name"
            value={name}
            onChange={handleChange}
          />
          <Input
            start="start"
            placeholder="Start Date"
            value={start}
            onChange={handleChangeStart}
          />
          <Input
            name="end"
            placeholder="End Date"
            value={end}
            onChange={handleChangeEnd}
          />
          <Button onClick={() => createEvent(name, start, end)}>
            Add Event
          </Button>
        </form>
      </Dialog>
      <Button variant="outlined" color="primary" onClick={handleClickOpenU}>
        Update Event
      </Button>
      <Dialog
        open={openU}
        onClose={handleCloseU}
        aria-labelledby="form-dialog-title"
      >
        <form>
          <Input
            name="delte"
            placeholder="Title "
            value={updateTitle}
            onChange={handleChangeUpdate}
          />
          <Input
            name="field"
            placeholder="Field (title, start, end)"
            value={updateType}
            onChange={handleChangeType}
          />
          <Input
            name="newVal"
            placeholder="New Value"
            value={updateVal}
            onChange={handleChangeUpdateVal}
          />
          <Button onClick={() => updateEvent()}>Update Event</Button>
        </form>
      </Dialog>
      <Button variant="outlined" color="primary" onClick={handleClickOpenD}>
        Delete Event
      </Button>
      <Dialog
        open={openD}
        onClose={handleCloseD}
        aria-labelledby="form-dialog-title"
      >
        <form>
          <Input
            name="delete"
            placeholder="Title of event to delete"
            value={deleteEvents}
            onChange={handleChangeDelete}
          />
          <Button onClick={deleteEvent}>Delete Event</Button>
        </form>{" "}
      </Dialog>
      <Button variant="outlined" color="primary" onClick={handleSubmitEvents}>
        Set Events
      </Button>
      <Calendar
        localizer={localizer}
        events={event}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        defaultDate={moment().toDate()}
        style={{ height: 500 }}
      />
    </div>
  );
}

export default CalendarApp;
