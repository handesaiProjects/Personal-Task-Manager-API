const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title for the task'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description for the task'],
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'in progress', 'completed'],
    default: 'pending',
  },
  dueDate: {
    type: Date,
    required: [true, 'Please specify the due date for the task'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: false, // Assuming tasks might not always be categorized
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Task', taskSchema);
