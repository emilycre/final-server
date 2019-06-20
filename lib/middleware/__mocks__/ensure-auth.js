module.exports = () => (req, res, next) => {
  req.user = {
    sub: 'test@test.com',
    email: 'test@test.com'
  };
  next();
};
