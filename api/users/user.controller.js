const models = require('../../db/models/index');

exports.index = (req, res) => {
  models.User.findAll()
    .then(users => res.json(users));
};

exports.show = (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) {
    return res.status(400).json({
      error: 'Incorrect id'
    });
  }
  models.User.findOne({
    where: {id: id}
  }).then(user => {
    user ? res.json(user) : res.status(404).json({
      error: 'Unknown user'
    });
  });
};

exports.destroy = (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) {
    return res.status(400).json({
      error: 'Incorrect id'
    });
  }
  models.User.destroy({
    where: {id: id}
  }).then(affectedRows => {
    affectedRows ? res.status(204).send() : res.status(404).json({
      error: 'Unknown user'
    });
  });
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
  }).then(user => res.status(201).json(user));
};

exports.update = (req, res) => {
  const id = parseInt(req.params.id);
  const name = req.body.name || '';
  if (!id) {
    return res.status(400).json({
      error: 'Incorrect id'
    });
  }
  if (!name.length) {
    return res.status(400).json({
      error: 'Incorrect name'
    })
  }
  models.User.update({
    name: name
  }, {
    where: {id: id}
  })
  .then(result => {
    if (!result[0]) {
      return res.status(404).json({
        error: 'Unknown user'
      });
    }
    return res.status(204).send();
  })
  .catch(err => {
    console.log(err);
    return res.status(500).send();
  });
}