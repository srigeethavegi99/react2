// server.js
const express = require('express');
const cors = require('cors');

const app = express();
// Middleware
app.use(express.json());
app.use(cors());

// In-memory storage for movies
let movies = [
    { id: 1, title: "The Shawshank Redemption", director: "Frank Darabont", year: 1994 },
    { id: 2, title: "The Godfather", director: "Francis Ford Coppola", year: 1972 },
    { id: 3, title: "The Dark Knight", director: "Christopher Nolan", year: 2008 },
];

// Routes
app.get('/api/movies', (req, res) => {
    res.json(movies);
});

app.post('/api/movies', (req, res) => {
    const { title, director, year } = req.body;
    const newMovie = { id: movies.length + 1, title, director, year };
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

app.put('/api/movies/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, director, year } = req.body;

    movies = movies.map(movie => {
        if (movie.id === id) {
            return { id, title, director, year };
        } else {
            return movie;
        }
    });

    res.sendStatus(204);
});

app.delete('/api/movies/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (movies.length === 1) {
        res.status(400).send("Cannot delete the last movie.");
    } else {
        movies = movies.filter(movie => movie.id !== id);
        res.sendStatus(204);
    }
});

// Start server
app.listen(3000, () => {
    console.log(`Server is running on port ${3000}`);
});
