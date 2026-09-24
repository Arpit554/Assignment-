const Submission = require('../models/Submission');
const Registration = require('../models/Registration');
const Competition = require('../models/Competition');

exports.createSubmission = async (req, res) => {
  try {
    const { id } = req.params; // competitionId
    const { userId, title, videoUrl, description, danceStyle } = req.body;

    if (!userId || !title || !videoUrl) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: userId, title, and videoUrl are mandatory.',
      });
    }

    // 1. Verify user is registered for this competition
    const registration = await Registration.findOne({
      user: userId,
      competition: id,
    });

    if (!registration) {
      return res.status(403).json({
        success: false,
        message: 'You must be a paid, registered participant to submit an entry.',
      });
    }

    // 2. Check competition existence
    const competition = await Competition.findById(id);
    if (!competition) {
      return res.status(404).json({ success: false, message: 'Competition not found.' });
    }

    // 3. Upsert submission (User can update their submission if before deadline)
    let submission = await Submission.findOne({ user: userId, competition: id });

    if (submission) {
      submission.title = title;
      submission.videoUrl = videoUrl;
      submission.description = description || submission.description;
      submission.danceStyle = danceStyle || submission.danceStyle;
      submission.submittedAt = new Date();
      await submission.save();
    } else {
      submission = await Submission.create({
        user: userId,
        competition: id,
        title,
        videoUrl,
        description,
        danceStyle: danceStyle || 'Kathak',
      });
    }

    res.status(201).json({
      success: true,
      message: 'Submission uploaded successfully!',
      data: submission,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.headers['x-user-id'] || req.query.userId;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required.' });
    }

    const submission = await Submission.findOne({ user: userId, competition: id });
    if (!submission) {
      return res.status(404).json({ success: false, message: 'No submission found for this user.' });
    }

    res.json({
      success: true,
      data: submission,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
