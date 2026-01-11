const mongoose = require('mongoose');

// Define the schema for waste entries
const wasteEntrySchema = new mongoose.Schema({
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  location: { type: String, default: '' }
}, { _id: false });

// Define the User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  wasteEntries: [wasteEntrySchema],
  awarenessScore: { type: Number, default: 0 },
  mostWastedCategory: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
