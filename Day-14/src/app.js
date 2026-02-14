const express = require('express');
const app = express()
const authRouter = require('./routes/auth.route')
const cookie = require('cookie-parser');
const postRouter = require('./routes/post.routes');

app.use(express.json())
app.use(cookie())
app.use('/api/auth',authRouter)
app.use('/api/posts', postRouter)
module.exports = app