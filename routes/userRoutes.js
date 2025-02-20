const express = require('express')
const db = require('../database.js')
const router = express.Router()

router.get('/users', (req, res) => {
    const query = 'SELECT * FROM users'
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching users:', err)
            res.status(400).json({ error: err.message })
        } else {
            console.log('Query Result:', result)
            res.json(result)
        }
    })
})

router.post("/users", (req, res) => {
    const { name, email, date } = req.body
    const query = "INSERT INTO users (name, email, date) VALUES (?, ?, ?)"
    db.query(query, [name, email, date], (err, result) => {
        if(err) {
            res.status(400).json({ error: err.message })
        } else {
            res.json({ id: result.insertId })
        }
    })
})


router.get('/users/:id', (req, res) => {
    const { id } = req.params 
    const query = 'SELECT * FROM users WHERE id = ?'
    db.query(query, [id], (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message })
        } else {
            res.json({ user: result[0] })
        }
    })
})

router.put('/users/:id', (req, res) => {
    const { id } = req.params 
    const { name, email, date } = req.body
    const query = 'UPDATE users SET name = ?, email = ?, date = ? WHERE id = ?'
    db.query(query, [name, email, date, id], (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message })
        } else {
            res.json({ message: 'User updated successfully', updatedID: id })
        }
    })
})

router.delete('/users/:id', (req, res) => {
    const { id } = req.params 
    const query = 'DELETE FROM users WHERE id = ?'
    db.query(query, [id], (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message })
        } else {
            res.json({ message: 'User deleted successfully', deletedID: id })
        }
    })
})

module.exports = router
