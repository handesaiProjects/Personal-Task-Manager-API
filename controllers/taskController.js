const Task = require('../models/Task');
const { asyncHandler } = require('../middleware/errorHandler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
exports.getTasks = asyncHandler(async (req, res, next) => {
  let query;

  // If a category query parameter is present, filter tasks by category
  if (req.query.category) {
    query = Task.find({ user: req.user.id, category: req.query.category });
  } else {
    query = Task.find({ user: req.user.id });
  }

  const tasks = await query;

  res.status(200).json({ success: true, count: tasks.length, data: tasks });
});

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
exports.getTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(new ErrorResponse(`Task not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns task
  if (task.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User not authorized to access this task`, 401));
  }

  res.status(200).json({ success: true, data: task });
});

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
exports.createTask = asyncHandler(async (req, res, next) => {
  // Add user to req,body
  req.body.user = req.user.id;

  const task = await Task.create(req.body);

  res.status(201).json({
    success: true,
    data: task
  });
});

// @desc    Update task
// @route   PATCH /api/tasks/:id
// @access  Private
exports.updateTask = asyncHandler(async (req, res, next) => {
  let task = await Task.findById(req.params.id);

  if (!task) {
    return next(new ErrorResponse(`Task not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns task
  if (task.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User not authorized to update this task`, 401));
  }

  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: task });
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(new ErrorResponse(`Task not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns task
  if (task.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User not authorized to delete this task`, 401));
  }

  task.remove();

  res.status(200).json({ success: true, data: {} });
});

