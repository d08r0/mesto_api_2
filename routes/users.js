const usersRouter = require('express').Router();

const {
  getUsers, createUser, getUser, patchUsers,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);

usersRouter.post('/users', createUser);

usersRouter.get('/users/:id', getUser);

usersRouter.patch('/users/me', patchUsers);

module.exports = usersRouter;
