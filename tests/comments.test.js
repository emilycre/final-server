require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');
const Comment = require('../lib/models/Comment');
const connect = require('../lib/utils/connect');

jest.mock('../lib/middleware/ensure-auth.js');

const createCommentHelper = (body, characterId = '1234') => {
  return Comment.create({ body, characterId, email: 'test@test.com' })
    .then(comment => JSON.parse(JSON.stringify(comment)));
};

describe('comments routes test', () => {
  beforeAll(() => {
    return connect();
  });

  afterEach(() => {
    mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  
  it('can post a comment', () => {
    return request(app)
      .post('/api/v1/comments')
      .send({ body: 'I am a comment', characterId: '1234' })
      .then(res => {
        expect(res.body).toEqual({
          body: 'I am a comment',
          characterId: '1234',
          __v: 0,
          _id: expect.any(String),
          email: 'test@test.com'
        });
      });
  });
  
  it('Can get a comment by characterId', async() => {
    const comments = await Promise.all(
      [...Array(10)]
        .map((_, i) => createCommentHelper(`Comment ${i}`)));
    return request(app)
      .get('/api/v1/comments/1234')
      .then(res => {
        comments.forEach(comment => {
          expect(res.body.comment).toEqual(comment.body.characterId);
        });
      });
  });

  it('Can delete a comment', () => {
    return request(app)
      .post('/api/v1/comments')
      .send({ body: 'I am another comment', characterId: '0001' })
      .then(res => request(app).delete(`/api/v1/comments/${res.body._id}`))
      .then(res => {
        expect(res.body).toEqual({
          body: 'I am another comment',
          characterId: '0001',
          __v: 0,
          _id: expect.any(String),
          email: 'test@test.com'
        });
      });
  });

});
