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
  return res.send('Hello World!\n');
});

app.get('/users', (req, res) => {
  return res.json(users);
});

app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) {
    return res.status(400).json({
      error: 'Incorrect id'
    });
  }
  let user = users.filter((user) => user.id === id)[0];
  if (!user) {
    return res.status(404).json({
      error: 'Unknown user'
    });
  }
  return res.json(user);
});

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) {
    return res.status(400).json({
      error: 'Incorrect id'
    });
  }
  let userIdx = users.findIndex((user) => user.id === id);
  if (userIdx < 0) {
    return res.status(404).json({
      error: 'Unknown user'
    });
  }
  console.log(`Deleting user with id ${id}.`);
  users.splice(userIdx, 1);
  return res.status(204).send();
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});