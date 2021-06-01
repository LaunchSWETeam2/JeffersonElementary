import request from "superagent";

const GOOGLE_CALENDAR_URL = `https://www.googleapis.com/calendar/v3/calendars/${"beb8nj@virginia.edu"}/events?key=${"AIzaSyDemy4My3WNtiT1prpskCHYcn002t7kkpA"}`;

function getEvents(callback) {
  return request.get(GOOGLE_CALENDAR_URL).end((err, resp) => {
    if (!err) {
      const events = [];
      JSON.parse(resp.text).items.map((event) => {
        return events.push({
          start: new Date(event.start.dateTime.toString()),
          end: new Date(event.end.dateTime.toString()),
          title: event.summary,
        });
      });
      callback(events);
    }
  });
}

export default getEvents;
