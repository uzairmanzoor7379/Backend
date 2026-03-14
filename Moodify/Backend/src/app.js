const express = require('express');
const cookie = require('cookie-parser');
const AuthRouter = require('./routes/auth.route');
const cors = require('cors');
const songRouter = require('./routes/song.route');
const path = require('path');

const app = express()

app.use(express.json())
app.use(cookie())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173', 'https://backend-c0ap.onrender.com']
}))

// API Routes pehle
app.use('/api/auth', AuthRouter)
app.use('/api/songs', songRouter)


app.use(express.static(path.join(__dirname, '../public')))


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

module.exports = app