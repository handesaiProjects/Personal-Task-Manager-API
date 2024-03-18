const mongoose = require('mongoose');

// Define the Category schema
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for the category'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for the category'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);
