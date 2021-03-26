const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

const PORT = process.env.PORT || 3000 ;

app.listen(PORT, () => {
  console.log('Server listening on http://localhost:3000');
});
