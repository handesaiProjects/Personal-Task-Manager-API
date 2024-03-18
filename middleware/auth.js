const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { asyncHandler } = require('./errorHandler');
const ErrorResponse = require('../utils/errorResponse');

// Middleware to protect routes and ensure they are accessed by authenticated users only
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if authorization header is set and is in the format 'Bearer [token]'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // Extract the token part
    token = req.headers.authorization.split(' ')[1];
  }

  // If no token, deny access
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user associated with the token
    req.user = await User.findById(decoded.id).select('-password');

    next();
  } catch (error) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});
