const { app } = require('./app');

// Models
const { Meal } = require('./models/meal.model');
const { Order } = require('./models/order.model');
const { Restaurant } = require('./models/restaurant.model');
const { Review } = require('./models/review.model');
const { User } = require('./models/user.model');

// Utils
const { db } = require('./utils/database.util');

db.authenticate()
  .then(() => console.log('Db authenticated'))
  .catch((err) => console.log(err));

// Establish model's relations

// 1 Restaurant <----> M Review
Restaurant.hasMany(Review, { foreignKey: 'restaurantId' });
Review.belongsTo(Restaurant);

// 1 Restaurant <----> M Meal
Restaurant.hasMany(Meal, { foreignKey: 'restaurantId' });
Meal.belongsTo(Restaurant);

// 1 User <----> M Review
User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User);

// 1 User <----> M Order
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User);

// 1 Order <----> 1 Meal
Meal.hasOne(Order, { foreignKey: { name: 'mealId' } });
Order.belongsTo(Meal);

db.sync()
  .then(() => console.log('Db synced'))
  .catch((err) => console.log(err));

app.listen(4000, () => {
  console.log('Express app running!!');
});
