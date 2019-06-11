const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  return res.send('Hello World!\n');
});

app.use('/users', require('./app/api/users'));

module.exports = app;