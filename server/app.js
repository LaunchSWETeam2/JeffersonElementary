//guide to routing: https://expressjs.com/en/guide/routing.html
var express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

var studentsRouter = require('./routes/students');
var teachersRouter = require('./routes/teachers');
var eventsRouter = require('./routes/events');
var classesRouter = require('./routes/classes');

app.use(cors())
app.use(express.json())//support for receiving json data in post request
// app.use(express.urlencoded({ extended: false })) might need for text?
app.use('/students', studentsRouter)
app.use('/teachers', teachersRouter)
app.use('/events', eventsRouter)
app.use('/classes', classesRouter)

app.listen(port, ()=>{
    console.log(`Server listening at http://localhost:${port}`)
})

module.exports = app;
