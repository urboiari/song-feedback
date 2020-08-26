const express = require('express');
const app = express();

app.listen(8000, () => console.log('listening at 8000'));
app.use(express.static('public'));
app.use(express.json({limit: '1kb'}));

app.post('/comments', (request, response) => {
  console.log(request.body);
  response.end();
});
