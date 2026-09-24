const mongoose = require('mongoose');

const rewardTierSchema = new mongoose.Schema({
  rank: { type: Number, required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  icon: { type: String, default: 'trophy' }
}, { _id: false });

const previousWinnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rankTitle: { type: String, required: true },
  avatarUrl: { type: String, required: true },
  videoUrl: { type: String, default: '' },
  thumbnailUrl: { type: String, default: '' }
}, { _id: false });

const criteriaItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  weight: { type: String, required: true },
  description: { type: String, required: true }
}, { _id: false });

const competitionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  category: {
    type: String,
    default: 'Dance',
  },
  tags: {
    type: [String],
    default: ['Dance', 'Multi-Win', 'Winners get certificate'],
  },
  prizePool: {
    type: Number,
    required: true,
    default: 1500,
  },
  entryFee: {
    type: Number,
    required: true,
    default: 99,
  },
  maxSpots: {
    type: Number,
    required: true,
    default: 20,
  },
  bookedSpots: {
    type: Number,
    default: 1,
    min: 0,
  },
  dates: {
    registerBefore: {
      type: Date,
      required: true,
    },
    submissionStart: {
      type: Date,
      required: true,
    },
    submissionEnd: {
      type: Date,
      required: true,
    },
    resultDate: {
      type: Date,
      required: true,
    },
  },
  judge: {
    name: { type: String, default: 'Manju Dubey' },
    role: { type: String, default: 'Professional Kathak Dancer' },
    experience: { type: String, default: '12+ Years of Experience' },
    avatarUrl: { type: String, default: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
    introVideoUrl: { type: String, default: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
  },
  previousWinners: [previousWinnerSchema],
  tabContent: {
    about: {
      shortText: {
        type: String,
        default: 'This is an online classical dance competition open for all age groups. Participate from anywhere and showcase your talent. Express your passion through traditional dance.',
      },
      fullText: {
        type: String,
        default: 'Feedants Classical Dance is India’s premier virtual platform celebrating timeless dance forms including Bharatnatyam, Kathak, Odissi, Kuchipudi, and Mohiniyattam. Showcase your mastery of Mudras, Bhava, and Thalam before esteemed classical gurus. Top performers earn cash rewards, verifiable digital certificates, and promotional spotlight on Feedants community channels.',
      },
    },
    judgingParameters: {
      criteria: [criteriaItemSchema],
    },
    rulesAndEligibility: {
      rules: [{ type: String }],
    },
  },
  rewards: [rewardTierSchema],
  disclaimerText: {
    type: String,
    default: 'Only contributions from paid participants will be considered for judging.',
  },
  referralInfo: {
    linkPrefix: { type: String, default: 'https://feedants.com/r/' },
    rewardPerSignup: { type: Number, default: 10 },
  },
  status: {
    type: String,
    enum: ['UPCOMING', 'REGISTRATION_OPEN', 'SUBMISSION_OPEN', 'JUDGING', 'RESULTS_DECLARED', 'CANCELLED'],
    default: 'REGISTRATION_OPEN',
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Virtual property for remaining spots
competitionSchema.virtual('remainingSpots').get(function() {
  return Math.max(0, this.maxSpots - this.bookedSpots);
});

// Virtual helper for status calculation based on current time or manual override
competitionSchema.methods.calculateComputedStatus = function() {
  if (this.status && this.status !== 'AUTO') {
    return this.status;
  }
  const now = new Date();
  if (now > this.dates.resultDate) {
    return 'RESULTS_DECLARED';
  }
  if (now > this.dates.submissionEnd) {
    return 'JUDGING';
  }
  if (now >= this.dates.submissionStart && now <= this.dates.submissionEnd) {
    return 'SUBMISSION_OPEN';
  }
  if (this.bookedSpots >= this.maxSpots || now > this.dates.registerBefore) {
    return 'REGISTRATION_CLOSED';
  }
  return 'REGISTRATION_OPEN';
};

module.exports = mongoose.model('Competition', competitionSchema);
