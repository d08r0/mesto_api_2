const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.user = {
    _id: '5f39afb82369d9d35e4bfa6b',
  };

  next();
});

app.use('/', usersRouter);
app.use('/', cardsRouter);

app.use((req, res, next) => {
  const error = new Error('Not found');
  res.status(404);
  res.contentType('JSON');
  error.status = 404;
  res.send({ message: 'Запрашиваемый ресурс не найден' });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
