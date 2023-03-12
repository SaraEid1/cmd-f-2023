const express = require('express');
const app = express();
const fs = require('fs');

const cors = require('cors');


// Enable CORS for all routes
app.use(cors());

app.get('/data', (req, res) => {
    fs.readFile('./data.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error reading data');
      } else {
        res.send(data);
      }
    });
  });


  
app.listen(1000, () => {
    console.log('Server listening on port 1000');
  });