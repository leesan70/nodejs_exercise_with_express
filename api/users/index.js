const express = require('express');
const router = express.Router();

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
];

router.get('/', (req, res) => {
  return res.json(users);
});

router.get('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

router.post('/', (req, res) => {
  const name = req.body.name || '';
  if (!name.length) {
    return res.status(400).json({
      error: 'Incorrect name'
    })
  }
  const id = users.reduce((maxId, user) => {
    return user.id > maxId ? user.id : maxId
  }, 0) + 1;
  const newUser = {
    id: id,
    name: name
  };
  users.push(newUser);
  return res.status(201).json(newUser);
});

module.exports = router;