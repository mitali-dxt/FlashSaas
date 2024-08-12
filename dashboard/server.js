const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const connection = mysql.createConnection({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12725570',
    password: 'vDYdxDaRJk',
    database: 'sql12725570',
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
});

// Routes
app.get('/categories', (req, res) => {
    connection.query('SELECT * FROM categories', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/categories', (req, res) => {
    const { name } = req.body;
    connection.query('INSERT INTO categories (name) VALUES (?)', [name], (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId, name });
    });
});

app.get('/flashcards', (req, res) => {
    connection.query('SELECT * FROM flashcards', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/flashcards/:categoryId', (req, res) => {
    const { categoryId } = req.params;
    connection.query('SELECT * FROM flashcards WHERE category_id = ?', [categoryId], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/flashcards', (req, res) => {
    const { question, answer, category_id } = req.body;
    connection.query('INSERT INTO flashcards (question, answer, category_id) VALUES (?, ?, ?)', [question, answer, category_id], (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId, question, answer, category_id });
    });
});

app.put('/flashcards/:id', (req, res) => {
    const { id } = req.params;
    const { question, answer, category_id } = req.body;
    connection.query('UPDATE flashcards SET question = ?, answer = ?, category_id = ? WHERE id = ?', [question, answer, category_id, id], (err) => {
        if (err) throw err;
        res.json({ id, question, answer, category_id });
    });
});

app.delete('/flashcards/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM flashcards WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ id });
    });
});

// Use the PORT environment variable or default to 5000
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
