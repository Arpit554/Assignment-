const User = require('../models/User');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: 1 });
    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const user = await User.create({
      name,
      email,
      phone,
      referralCode: name.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 100),
    });
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
