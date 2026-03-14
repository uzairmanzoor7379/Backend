const express = require('express');
const cookie = require('cookie-parser');
const AuthRouter = require('./routes/auth.route');
const cors = require('cors');
const songRouter = require('./routes/song.route');
const app = express()
app.use(express.json())
app.use(cookie())
app.use(express.static('./public'))
app.use(cors({
    credentials : true,
    origin : 'http://localhost:5173'
}))

// Routes
app.use('/api/auth', AuthRouter)
app.use('/api/songs',songRouter)

module.exports = app