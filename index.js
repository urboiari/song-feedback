// INITIALIZE EXPRESS AND NEDB
const express = require('express');
const Datastore = require('nedb');

// SET UP ROUTE TO LISTEN AT 8000
const app = express();
app.listen(8000, () => console.log('listening at 8000'));
app.use(express.static('public'));
app.use(express.json({limit: '1kb'}));

// SET UP DATABASE AND FUNCTION TO DELETE DB CONTENT
let database = new Datastore('commentBank.db');
database.loadDatabase();

// database.remove({}, { multi: true }, function (err, numRemoved) {
//   console.log(numRemoved);
// });

// SET UP POST TO SEND COMMENTS TO THE DB
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

// SET UP GET TO SEND DB INFORMATION TO THE CLIENT
app.get('/comments', (request, response) => {
  database.find({}, (err, data) => {
    response.json(data);
  });
});

// FUNCTION TO CREATE A TIMESTAMP FOR USE IN DB
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
