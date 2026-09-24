const express = require('express');
const router = express.Router();
const {
  getCompetitions,
  getCompetitionById,
  registerForCompetition,
  simulateState,
} = require('../controllers/competitionController');
const {
  createSubmission,
  getSubmission,
} = require('../controllers/submissionController');
const seedDatabase = require('../utils/seedData');

// Competition retrieval
router.get('/', getCompetitions);
router.get('/:id', getCompetitionById);

// Registration
router.post('/:id/register', registerForCompetition);

// Submissions
router.post('/:id/submit', createSubmission);
router.get('/:id/submission', getSubmission);

// Demo & Testing Helper Endpoints
router.post('/:id/simulate-state', simulateState);
router.post('/seed/reset', async (req, res) => {
  try {
    const result = await seedDatabase();
    res.json({ success: true, message: 'Database reseeded successfully!', data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
