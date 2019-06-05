const models = require('../../models');

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

exports.index = (req, res) => {
  return res.json(users);
};

exports.show = (req, res) => {
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
};

exports.destroy = (req, res) => {
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
};

exports.create = (req, res) => {
  const name = req.body.name || '';
  if (!name.length) {
    return res.status(400).json({
      error: 'Incorrect name'
    })
  }
  models.User.create({
    name: name
  }).then( user => res.status(201).json(user) );
};