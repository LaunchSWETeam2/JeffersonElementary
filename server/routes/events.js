const { Restaurant } = require("@material-ui/icons");
var express = require("express");
var router = express.Router();
var db = require("../firebase");
const eventsRef = db.collection("events");

router.get("/read", async (req, res) => {
  const events = [];
  const snapshot = await eventsRef.get();

  snapshot.forEach((doc) => {
    let docU = { ...doc.data(), id: doc.id };
    events.push(docU);
  });
  res.send(events);
});
router.post("/add", async (req, res) => {
  var input = req.body;

  const snapshot = eventsRef.add(input);
  res.send(snapshot);
});

router.delete("/delete/:query", async (req, res) => {
  var docToDeleteId = "";
  var title = req.params.query;
  const events = [];
  const snapshot = await db.collection("events").get();

  snapshot.forEach((doc) => {
    let docU = { ...doc.data(), id: doc.id };
    events.push(docU);
  });
  for (var i = 0; i < events.length; i++) {
    if (events[i].title === title) docToDeleteId = events[i].id;
  }
  const del = await db.collection("events").doc(docToDeleteId).delete();
  res.send("DELETE Request Called");
});
router.post("/update/:query", async (req, res) => {
  var docToUpdateId = "";
  var title = req.params.query;
  var val = req.body.val;
  var type = req.body.type;
  const events = [];
  const snapshot = await db.collection("events").get();

  snapshot.forEach((doc) => {
    let docU = { ...doc.data(), id: doc.id };
    events.push(docU);
  });
  for (var i = 0; i < events.length; i++) {
    if (events[i].title === title) docToUpdateId = events[i].id;
  }
  const eventRef = eventsRef.doc(docToUpdateId);
  if (type === "title") {
    const resp = await eventRef.update({ title: val });
  } else if (type === "start") {
    const resp2 = await eventRef.update({ start: val });
  } else if (type === "end") {
    const resp3 = await eventRef.update({ end: val });
  }
  res.send("Update");
});
module.exports = router;
