const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoutes')
const path = require('path')

const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')))
app.use("/api", userRoutes)
app.get('/', (req, res) => {
    res.json({ message: 'User routes working' });
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})

module.exports = app
