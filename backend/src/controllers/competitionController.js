const Competition = require('../models/Competition');
const Registration = require('../models/Registration');
const Submission = require('../models/Submission');
const User = require('../models/User');

// Get all competitions or the primary featured one
exports.getCompetitions = async (req, res) => {
  try {
    const competitions = await Competition.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: competitions.length,
      data: competitions,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single competition with dynamic user context
exports.getCompetitionById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.headers['x-user-id'] || req.query.userId;

    let competition;
    if (id === 'latest' || id === 'featured') {
      competition = await Competition.findOne().sort({ createdAt: -1 });
    } else {
      competition = await Competition.findById(id);
    }

    if (!competition) {
      return res.status(404).json({ success: false, message: 'Competition not found' });
    }

    let userState = {
      isRegistered: false,
      hasSubmitted: false,
      registrationDetails: null,
      submissionDetails: null,
    };

    if (userId) {
      const registration = await Registration.findOne({
        user: userId,
        competition: competition._id,
      });

      if (registration) {
        userState.isRegistered = true;
        userState.registrationDetails = registration;

        const submission = await Submission.findOne({
          user: userId,
          competition: competition._id,
        });

        if (submission) {
          userState.hasSubmitted = true;
          userState.submissionDetails = submission;
        }
      }
    }

    // Dynamic computed values
    const remainingSpots = Math.max(0, competition.maxSpots - competition.bookedSpots);
    const computedStatus = competition.calculateComputedStatus ? competition.calculateComputedStatus() : competition.status;

    res.json({
      success: true,
      data: {
        ...competition.toObject(),
        remainingSpots,
        computedStatus,
        serverTime: new Date().toISOString(),
        userState,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Concurrency-safe atomic registration
exports.registerForCompetition = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, paymentMethod = 'Razorpay UPI' } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required for registration.' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if user is already registered (Idempotency)
    const existingRegistration = await Registration.findOne({
      user: userId,
      competition: id,
    });

    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: 'You are already registered for this competition.',
        data: existingRegistration,
      });
    }

    // Atomic find and increment with guard condition to prevent race conditions & overbooking
    const updatedCompetition = await Competition.findOneAndUpdate(
      {
        _id: id,
        bookedSpots: { $lt: 20 }, // Ensures booked spots doesn't exceed maxSpots
      },
      {
        $inc: { bookedSpots: 1 },
      },
      { new: true }
    );

    if (!updatedCompetition) {
      return res.status(409).json({
        success: false,
        message: 'Registration is full! No spots remaining.',
      });
    }

    // Create registration record
    const transactionId = 'PAY_' + Math.random().toString(36).substring(2, 10).toUpperCase();
    const registration = await Registration.create({
      user: userId,
      competition: id,
      amountPaid: updatedCompetition.entryFee,
      paymentStatus: 'SUCCESS',
      transactionId,
      paymentMethod,
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful! Spot confirmed.',
      data: {
        registration,
        bookedSpots: updatedCompetition.bookedSpots,
        remainingSpots: updatedCompetition.maxSpots - updatedCompetition.bookedSpots,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Duplicate registration detected.' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Simulation endpoint for Demo/Testing various competition states
exports.simulateState = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, bookedSpots, datesOffset } = req.body;

    const competition = await Competition.findById(id);
    if (!competition) {
      return res.status(404).json({ success: false, message: 'Competition not found' });
    }

    if (status) {
      competition.status = status;
    }
    if (typeof bookedSpots === 'number') {
      competition.bookedSpots = Math.min(competition.maxSpots, Math.max(0, bookedSpots));
    }
    if (datesOffset) {
      // Modify dates dynamically if needed for live testing
      const now = Date.now();
      if (datesOffset === 'CLOSING_SOON') {
        competition.dates.registerBefore = new Date(now + 1000 * 60 * 60 * 30); // 30 hours
      } else if (datesOffset === 'CLOSED') {
        competition.dates.registerBefore = new Date(now - 1000 * 60 * 60); // 1 hr ago
      }
    }

    await competition.save();

    res.json({
      success: true,
      message: 'Competition state simulated successfully!',
      data: competition,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
