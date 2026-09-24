const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
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
  title: {
    type: String,
    required: true,
    trim: true,
  },
  videoUrl: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  danceStyle: {
    type: String,
    default: 'Kathak',
  },
  status: {
    type: String,
    enum: ['SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED'],
    default: 'SUBMITTED',
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
  },
  judgeFeedback: {
    type: String,
    default: '',
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

submissionSchema.index({ user: 1, competition: 1 });

module.exports = mongoose.model('Submission', submissionSchema);
