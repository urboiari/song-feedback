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
  response.json({
    status: 'success',
    comment: request.body.comment
  });
});
