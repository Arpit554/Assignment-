const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  competition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Competition',
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['PENDING', 'SUCCESS', 'FAILED'],
    default: 'SUCCESS',
  },
  transactionId: {
    type: String,
    required: true,
    unique: true,
  },
  paymentMethod: {
    type: String,
    default: 'Razorpay UPI',
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Enforce single registration per user per competition
registrationSchema.index({ user: 1, competition: 1 }, { unique: true });

module.exports = mongoose.model('Registration', registrationSchema);
