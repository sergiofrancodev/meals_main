const express = require('express');

// Controllers
const {
  getAllOrders,
  getOrderById,
  createUser,
  updateUser,
  deleteUser,
  login,
  getAllUsers,
} = require('../controllers/users.controller');

// Middlewares
const {
  createUserValidators,
} = require('../middlewares/validators.middleware');

const { userExists } = require('../middlewares/users.middleware');
const { orderExists } = require('../middlewares/orders.middleware');

const {
  protectSession,
  protectUserAccount,
} = require('../middlewares/auth.middleware');

const usersRouter = express.Router();

usersRouter.post('/signup', createUserValidators, createUser);

usersRouter.post('/login', login);

usersRouter.use(protectSession);

usersRouter.get('/', getAllUsers);

usersRouter.get('/orders', getAllOrders);
usersRouter.get('/orders/:id', orderExists, getOrderById);

usersRouter
  .use('/:id', userExists)
  .route('/:id')
  .patch(protectUserAccount, updateUser)
  .delete(protectUserAccount, deleteUser);

module.exports = { usersRouter };
