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
module.exports = router;
