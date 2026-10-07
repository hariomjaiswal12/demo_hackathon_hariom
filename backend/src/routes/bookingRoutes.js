import express from 'express';
import {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
  checkIn,
  endEarly,
  cancel,
  extend,
} from '../controllers/bookingController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all booking endpoints with JWT authentication
router.use(authMiddleware);

router.get('/', getBookings);
router.post('/', createBooking);
router.get('/:id', getBookingById);
router.patch('/:id', updateBooking);
router.delete('/:id', deleteBooking);

// Lifecycle action endpoints
router.post('/:id/check-in', checkIn);
router.post('/:id/end', endEarly);
router.post('/:id/cancel', cancel);
router.post('/:id/extend', extend);

export default router;

