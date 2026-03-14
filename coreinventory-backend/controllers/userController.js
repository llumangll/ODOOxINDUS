const UserModel = require('../models/userModel');

async function getProfile(req, res) {
  try {
    const userId = req.user.id;
    const user = await UserModel.findById(userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.error('getProfile error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch user profile' });
  }
}

async function updateProfile(req, res) {
  try {
    const userId = req.user.id;
    const { fullName, phone, email, role, avatarUrl } = req.body;

    const updatedUser = await UserModel.updateProfile(userId, { 
      fullName, 
      phone, 
      email,
      role,
      avatarUrl
    });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, data: updatedUser, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('updateProfile error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to update user profile' });
  }
}

module.exports = {
  getProfile,
  updateProfile
};
