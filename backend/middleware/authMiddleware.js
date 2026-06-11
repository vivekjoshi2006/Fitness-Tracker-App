const jwt = require('jsonwebtoken');
const mockDb = require('../mockDb');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'presentation_secret_key');
      
      const foundUser = mockDb.users.find(u => u._id === decoded.id);
      if (!foundUser) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }
      
      const { password, ...userWithoutPassword } = foundUser;
      req.user = userWithoutPassword;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };