const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUser } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Private routes
router.get('/profile', protect, getUserProfile);
router.patch('/profile', protect, updateUserProfile);
router.delete('/profile', protect, deleteUser);

module.exports = router;
