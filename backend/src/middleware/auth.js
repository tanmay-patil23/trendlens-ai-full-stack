const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header, query, or cookie
    let token = req.header('Authorization')?.replace('Bearer ', '') || 
                req.query.token || 
                req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Access denied. No token provided.',
        code: 'NO_TOKEN'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from database
      const user = await User.findById(decoded.userId).select('-password');

      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Token is not valid. User not found.',
          code: 'USER_NOT_FOUND'
        });
      }

      // Check if user account is active
      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          error: 'Account is deactivated.',
          code: 'ACCOUNT_DEACTIVATED'
        });
      }

      // Add user to request object
      req.user = user;
      next();

    } catch (tokenError) {
      return res.status(401).json({
        success: false,
        error: 'Token is not valid.',
        code: 'INVALID_TOKEN'
      });
    }

  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error in authentication',
      message: error.message
    });
  }
};

// Optional auth middleware (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
  try {
    let token = req.header('Authorization')?.replace('Bearer ', '') || 
                req.query.token || 
                req.cookies.token;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');

        if (user && user.isActive) {
          req.user = user;
        }
      } catch (err) {
        // Token invalid, but continue without user
        console.log('Optional auth: Invalid token, continuing without user');
      }
    }

    next();
  } catch (error) {
    next();
  }
};

module.exports = { authMiddleware, optionalAuth };
