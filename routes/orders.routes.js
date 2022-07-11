const express = require('express');

// Controllers
const {
  createOrder,
  getAllOrders,
  completedOrder,
  cancelledOrder,
} = require('../controllers/orders.controller');

// Middlewares
const {
  createOrderValidators,
} = require('../middlewares/validators.middleware');

const { orderExists } = require('../middlewares/orders.middleware');
const { mealExists } = require('../middlewares/meals.middleware');

const { protectSession } = require('../middlewares/auth.middleware');

const ordersRouter = express.Router();

ordersRouter.use(protectSession);

ordersRouter.post('/', mealExists, createOrderValidators, createOrder);

ordersRouter.get('/me', getAllOrders);

ordersRouter
  .use('/:id', orderExists)
  .route('/:id')
  .patch(completedOrder)
  .delete(cancelledOrder);

module.exports = { ordersRouter };
