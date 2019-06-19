require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');
const Comment = require('../lib/models/Comment');

jest.mock('../lib/middleware/ensureAuth.js');

const createCommentHelper = () => ['one', 'two', 'three'].map((num, i) => {
  return Comment.create({ body: `I am a comment ${i}`, characterId: `${num}`, user: `${i}` });
});

describe('comments routes test', () => {
  beforeAll(() => {
    return mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
  });
  
  beforeEach(() => {
    return createCommentHelper();
  });
  
  afterEach(() => {
    return mongoose.connection.dropDatabase();
  });
  
  afterAll(() => {
    return mongoose.connection.close();
  });
  it('can post a comment', () => {
    return request(app)
      .post('/comments')
      .send({ body: 'I am a comment', characterId: '1234'  })
      .then(res => {
        expect(res.body).toEqual({ 
          body: 'I am a comment', 
          characterId: '1234', 
          __v:0,
          _id: expect.any(String),
          user: '1234'
        });
      });
  });
  it('can get all comments', () => {
    return request(app)
      .get('/comments')
      .then(res => {
        expect(res.body).toEqual();
      });

  });
});
