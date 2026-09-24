const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    default: '+91 9876543210',
  },
  avatarUrl: {
    type: String,
    default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  },
  referralCode: {
    type: String,
    unique: true,
    sparse: true,
  },
  walletBalance: {
    type: Number,
    default: 100,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
