const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

// Apply 'protect' middleware to all routes to ensure they are accessed by authenticated users only
router.use(protect);

// Routes for handling tasks
router.route('/')
  .get(getTasks) // GET /api/tasks - Get all tasks for the logged-in user
  .post(createTask); // POST /api/tasks - Create a new task

router.route('/:id')
  .get(getTask) // GET /api/tasks/:id - Get a single task by its ID
  .patch(updateTask) // PATCH /api/tasks/:id - Update a task by its ID
  .delete(deleteTask); // DELETE /api/tasks/:id - Delete a task by its ID

module.exports = router;
