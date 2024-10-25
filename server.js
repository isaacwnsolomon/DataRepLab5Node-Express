const express = require('express');
const app = express();
const port = 3000;

//Defining route for root URL
app.get('/', (req, res) => {
    res.send('Welcome to Data Respresentation & Querying');
});
// Starting server and listening on port 
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

//Defining route to greet user by their name when they go to URL with their name 
app.get('/hello/:name', (req, res) => {
    const name = req.params.name;
    res.send(`Hello ${name}`);
});

// Route to greet user by first and last name
app.get('/hello/:name/:sname', (req, res) => {
    const name = req.params.name;
    const sname = req.params.sname;
    res.send(`Hello ${name} ${sname}`);
});

// Route to return movies in JSON format
app.get('/api/movies', (req, res) => {
    const movies = [
        {
            "Title": "Avengers: Infinity War",
            "Year": "2018",
            "imdbID": "tt4154756",
            "Type": "movie",
            "Poster": "https://example.com/poster1.jpg"
        },
        {
            "Title": "Captain America: Civil War",
            "Year": "2016",
            "imdbID": "tt3498820",
            "Type": "movie",
            "Poster": "https://example.com/poster2.jpg"
        },
        {
            "Title": "World War Z",
            "Year": "2013",
            "imdbID": "tt0816711",
            "Type": "movie",
            "Poster": "https://example.com/poster3.jpg"
        }
    ];
    res.status(200).json({myMovies:movies });
});

// Getting path
const path = require('path');

// Route to HTML file 
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.static('public'));

// Greet user using querys using GET method
app.get('/name', (req, res) => {
    // Getting first and last name 
    const firstname = req.query.firstname;
    const lastname = req.query.lastname;
    res.send(`Hello ${firstname} ${lastname}`);
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Greet user using querys using POST method 
app.post('/name', (req, res) => {
    // Getting first and last name 
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    // Send hello firstname lastname 
    res.send(`Hello ${firstname} ${lastname}`);
});
