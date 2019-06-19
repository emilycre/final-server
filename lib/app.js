const express = require('express');
const app = express();

app.use(express.json());

app.use('/comments', require('./routes/comments'));

module.exports = app;
