const express = require('express');
const app = express();

let users = [
  {
    id: 1,
    name: 'alice'
  },
  {
    id: 2,
    name: 'bek'
  },
  {
    id: 3,
    name: 'chris'
  }
]

app.get('/', (req, res) => {
  res.send('Hello World!\n');
 });

app.get('/users', (req, res) => {
  res.json(users);
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});