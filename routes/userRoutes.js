const express = require('express');
const router = express.Router();
const db = require('../database');

// Create a new user
router.post('/users', (req, res) => {
    const { name, email } = req.body;
    const query = `INSERT INTO users (name, email) VALUES (?, ?)`;
    db.query(query, [name, email], (err, results) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.json({ id: results.insertId });
        }
    });
});

// Get all users
router.get('/users', (req, res) => {
    const query = `SELECT * FROM users`;
    db.query(query, (err, results) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.json({ users: results });
        }
    });
});

// Get a single user
router.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM users WHERE id = ?`;
    db.query(query, [id], (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.json({ user: result[0] });
        }
    });
});

// Update a user
router.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const query = `UPDATE users SET name = ?, email = ? WHERE id = ?`;
    db.query(query, [name, email, id], (err, results) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.json({ message: 'User updated successfully', updatedID: id });
        }
    });
});

// Delete a user
router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM users WHERE id = ?`;
    db.query(query, [id], (err, results) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.json({ message: 'User deleted successfully', deletedID: id });
        }
    });
});

module.exports = router;
