const { Router } = require('express');
const Comment = require('../models/Comment');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth(), (req, res, next) => {
    const { body, characterId } = req.body;

    Comment
      .create({ body, characterId, email: req.user.sub })
      .then(comment => res.send(comment))
      .catch(next);
  })
  
  .get('/:characterId', (req, res, next) => {
    Comment
      .findById(req.params.id)
      .then(comments => res.send(comments))
      .catch(next);
  });
