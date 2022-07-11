const express = require('express');

// Controllers
const {
  createMeal,
  getAllMeals,
  getAllMealById,
  updateMeal,
  deteleMeal,
} = require('../controllers/meals.controller');

// Middlewares
const {
  createMealValidators,
} = require('../middlewares/validators.middleware');
const { restaurantExists } = require('../middlewares/restaurants.middleware');

const { mealExists } = require('../middlewares/meals.middleware');

const { protectSession } = require('../middlewares/auth.middleware');

const mealsRouter = express.Router();

mealsRouter.get('/', getAllMeals);

mealsRouter.get('/:id', mealExists, getAllMealById);

mealsRouter.use(protectSession);

mealsRouter.post('/:id', restaurantExists, createMealValidators, createMeal);

mealsRouter
  .use('/:id', mealExists)
  .route('/:id')
  .patch(updateMeal)
  .delete(deteleMeal);

module.exports = { mealsRouter };
