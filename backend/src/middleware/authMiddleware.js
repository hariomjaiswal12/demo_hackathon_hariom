import { verifyToken } from '../utils/token.js';
import { User } from '../models/User.js';
import { sendError } from '../utils/response.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, 401, 'Authentication token required');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return sendError(res, 401, 'Authentication token required');
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return sendError(res, 401, 'User associated with token no longer exists');
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return sendError(res, 401, 'Invalid or expired authentication token');
    }
    next(error);
  }
};
