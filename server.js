require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./lib/app');

const PORT = process.env.PORT || 7891;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('listening on PORT', PORT);
});
