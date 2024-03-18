const Category = require('../models/Category');
const { asyncHandler } = require('../middleware/errorHandler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Create a new category
// @route   POST /categories
// @access  Private
exports.createCategory = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const category = await Category.create(req.body);

  res.status(201).json({
    success: true,
    data: category
  });
});

// @desc    Get all categories
// @route   GET /categories
// @access  Private
exports.getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories
  });
});

// @desc    Get single category
// @route   GET /categories/:id
// @access  Private
exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns category
  if (category.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User not authorized to access this category`, 401));
  }

  res.status(200).json({
    success: true,
    data: category
  });
});

// @desc    Update category
// @route   PATCH /categories/:id
// @access  Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  let category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns category
  if (category.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User not authorized to update this category`, 401));
  }

  category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: category
  });
});

// @desc    Delete category
// @route   DELETE /categories/:id
// @access  Private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns category
  if (category.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User not authorized to delete this category`, 401));
  }

  category.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
