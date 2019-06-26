const { Router } = require('express');
const Comment = require('../models/Comment');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth(), (req, res, next) => {
    const { body, characterId } = req.body;

    Comment
      .create({ body, characterId, email: req.user.email })
      .then(comment => res.send(comment))
      .catch(next);
  })

  .get('/:characterId', (req, res, next) => {
    const { characterId } = req.params.characterId;
    
    Comment
      .find(characterId)
      .then((comment => res.send(comment)))
      .catch(next);
  })

  .patch('/:characterId', (req, res, next) => {
    Comment
      .findByIdAndUpdate(req.params.characterId, req.body, { new: true })
      .then(updatedComment => {
        res.send(updatedComment);
      })
      .catch(next);
  })

  .delete('/:characterId', (req, res, next) => {
    Comment
      .findByIdAndDelete(req.params.characterId)
      .then(deletedComment => {
        res.send(deletedComment);
      })
      .catch(next);
  });
