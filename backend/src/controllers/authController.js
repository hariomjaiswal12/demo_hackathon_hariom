import { User } from '../models/User.js';
import { generateToken } from '../utils/token.js';
import { sendSuccess, sendError } from '../utils/response.js';

// POST /api/auth/register
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return sendError(res, 400, 'Name, email, and password are required');
    }

    if (password.length < 6) {
      return sendError(res, 400, 'Password must be at least 6 characters long');
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return sendError(res, 400, 'User with this email already exists');
    }

    // Default role is 'USER' unless explicitly provided (e.g. ADMIN)
    const newUser = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password,
      role: req.body.role || 'USER',
    });


    const token = generateToken(newUser._id, newUser.role);

    return sendSuccess(res, 201, 'User registered successfully', {
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 400, 'Email and password are required');
    }

    // Fetch user and explicitly include select:false password field
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
    if (!user) {
      return sendError(res, 401, 'Invalid email or password');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return sendError(res, 401, 'Invalid email or password');
    }

    const token = generateToken(user._id, user.role);

    return sendSuccess(res, 200, 'Login successful', {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/auth/me
export const getCurrentUser = async (req, res, next) => {
  try {
    return sendSuccess(res, 200, 'Current user retrieved', {
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
