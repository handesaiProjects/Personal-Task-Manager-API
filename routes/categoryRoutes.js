const express = require('express');
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');

const { protect } = require('../middleware/auth');

const router = express.Router();

// Apply 'protect' middleware to all routes to ensure they are accessed by authenticated users only
router.use(protect);

router.route('/')
  .post(createCategory)
  .get(getCategories);

router.route('/:id')
  .get(getCategory)
  .patch(updateCategory)
  .delete(deleteCategory);

module.exports = router;
