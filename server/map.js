const cors = require('cors');
const express = require('express');
const app = express();
const corsOptions = {
    origin: 'http://localhost:3000'
};
app.use(cors(corsOptions));

const fetch = require('node-fetch');

const apiKey = `AIzaSyAMupgR8rLSPwc1vIGpqT7kTRMQkOzDv74`;
const baseUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=49.260605,-123.245994&radius=5000&type=pharmacy&keyword=drugstore&key=${apiKey}&maxresult=8`

app.get('/', (req, res) => {
    // Fetch data from API
    fetch(baseUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data.results);
            res.json(data.results);
        })
        .catch(err => console.error(err));
});

const port = 1002;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
