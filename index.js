const express = require('express');
const Datastore = require('nedb');

const app = express();
app.listen(8000, () => console.log('listening at 8000'));
app.use(express.static('public'));
app.use(express.json({limit: '1kb'}));

let database = new Datastore('commentBank.db');
database.loadDatabase();

app.post('/comments', (request, response) => {


  console.log(request.body);
  let timestamp = makeTimestamp();
  database.insert({
    comment: request.body,
    timestamp: timestamp
  });
  response.json({
    status: 'success',
    comment: request.body.comment,
    timestamp: timestamp
  });
});

function makeTimestamp() {
  let currentTime = new Date;
  let currentMonth = currentTime.getMonth();
  let currentDate = currentTime.getDate();
  let currentHours = currentTime.getHours();
  let currentMinutes = currentTime.getMinutes();

  currentMinutes = (currentMinutes < 10 ? '0' : '') + currentMinutes;

  let timeOfDay = (currentHours < 12) ? 'am' : 'pm';
  currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;
  currentHours = (currentHours == 0) ? 12 : currentHours;

  return `${currentMonth}/${currentDate} ${currentHours}:${currentMinutes} ${timeOfDay}`;
}
