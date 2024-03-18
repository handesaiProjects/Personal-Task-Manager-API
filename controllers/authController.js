const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('../middleware/errorHandler').asyncHandler;
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// Function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expires in 30 days
  });
};

// @desc    Register new user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  // Create user
  const user = await User.create({
    username,
    email,
    password,
  });

  // Generate JWT
  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    token,
  });
});

// @desc    Login user & get token
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Generate JWT
  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    token,
  });
});

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  // User is already available in req.user from the protect middleware
  const user = req.user;

  res.status(200).json({
    success: true,
    data: user,
  });
});
