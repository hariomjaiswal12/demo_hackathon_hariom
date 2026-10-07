import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Security Headers
app.use(helmet());

// CORS Configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// Body Parser & Request Logger
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Health Endpoint
app.get('/api/health', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'DeskDrop API is running',
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/bookings', bookingRoutes);

// Error Handling Middleware
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
