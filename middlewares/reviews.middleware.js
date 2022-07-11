// Models
const { Review } = require('../models/review.model');

// Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const reviewExists = catchAsync(async (req, res, next) => {
  const { reviewId } = req.params;

  const review = await Review.findOne({
    where: { id: reviewId, status: 'active' },
  });

  if (!review) {
    return next(new AppError('Review not found', 404));
  }

  req.review = review;
  next();
});

module.exports = { reviewExists };
