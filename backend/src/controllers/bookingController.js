import { Booking } from '../models/Booking.js';
import {
  checkBookingOverlap,
  checkInBooking,
  endBooking,
  cancelBooking,
  extendBooking,
} from '../services/bookingService.js';
import { sendSuccess, sendError } from '../utils/response.js';

// GET /api/bookings (USER gets own bookings, ADMIN gets all)
export const getBookings = async (req, res, next) => {
  try {
    const { status, resourceId } = req.query;
    const query = {};

    // Ownership filter: USER gets only their own bookings, ADMIN sees all
    if (req.user.role !== 'ADMIN') {
      query.user = req.user._id;
    }

    if (status) {
      query.status = status.toUpperCase();
    }
    if (resourceId) {
      query.resource = resourceId;
    }

    const bookings = await Booking.find(query)
      .populate('resource', 'name resourceCode location category status image')
      .populate('user', 'name email role')
      .sort({ startTime: -1 });

    return sendSuccess(res, 200, 'Bookings retrieved successfully', bookings);
  } catch (error) {
    next(error);
  }
};

// GET /api/bookings/:id
export const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('resource', 'name resourceCode location category status image')
      .populate('user', 'name email role');

    if (!booking) {
      return sendError(res, 404, 'Booking not found');
    }

    // Ownership check: USER can only view their own booking unless ADMIN
    if (req.user.role !== 'ADMIN' && booking.user && booking.user._id.toString() !== req.user._id.toString()) {
      return sendError(res, 403, 'Forbidden: You do not have permission to view this booking.');
    }

    return sendSuccess(res, 200, 'Booking details retrieved', booking);
  } catch (error) {
    next(error);
  }
};

// POST /api/bookings (User ID forced from authenticated req.user._id!)
export const createBooking = async (req, res, next) => {
  try {
    const { resourceId, startTime, endTime, purpose } = req.body;

    if (!resourceId || !startTime || !endTime) {
      return sendError(res, 400, 'resourceId, startTime, and endTime are required.');
    }

    // Server-side Overlap Check (returns HTTP 409 on conflict)
    const { resource, requestedStart, requestedEnd } = await checkBookingOverlap(
      resourceId,
      startTime,
      endTime
    );

    // Generate numeric passcode token
    const passcode = `${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(100 + Math.random() * 900)}`;

    const newBooking = await Booking.create({
      resource: resource._id,
      user: req.user._id, // Enforce authenticated user ID!
      startTime: requestedStart,
      endTime: requestedEnd,
      purpose: purpose || 'General Workspace Booking',
      passcode,
      status: 'CONFIRMED',
    });

    const populatedBooking = await Booking.findById(newBooking._id).populate(
      'resource',
      'name resourceCode location category image'
    );

    return sendSuccess(res, 201, 'Booking created successfully', populatedBooking);
  } catch (error) {
    next(error);
  }
};

// PATCH /api/bookings/:id (Routes to lifecycle service functions)
export const updateBooking = async (req, res, next) => {
  try {
    const { action, status, endTime } = req.body;
    const targetStatus = status ? status.toUpperCase() : null;
    const targetAction = action ? action.toLowerCase() : null;

    if (targetAction === 'check-in' || targetStatus === 'ACTIVE') {
      const updated = await checkInBooking(req.params.id, req.user);
      return sendSuccess(res, 200, 'Booking checked in successfully', updated);
    }

    if (targetAction === 'end' || targetStatus === 'COMPLETED') {
      const updated = await endBooking(req.params.id, req.user);
      return sendSuccess(res, 200, 'Booking ended successfully', updated);
    }

    if (targetAction === 'cancel' || targetStatus === 'CANCELLED') {
      const updated = await cancelBooking(req.params.id, req.user);
      return sendSuccess(res, 200, 'Booking cancelled successfully', updated);
    }

    if (targetAction === 'extend' || endTime) {
      if (!endTime) {
        return sendError(res, 400, 'endTime is required for booking extension.');
      }
      const updated = await extendBooking(req.params.id, endTime, req.user);
      return sendSuccess(res, 200, 'Booking extended successfully', updated);
    }

    return sendError(res, 400, 'Invalid update action or status transition.');
  } catch (error) {
    next(error);
  }
};

// POST /api/bookings/:id/check-in
export const checkIn = async (req, res, next) => {
  try {
    const booking = await checkInBooking(req.params.id, req.user);
    return sendSuccess(res, 200, 'Booking checked in successfully', booking);
  } catch (error) {
    next(error);
  }
};

// POST /api/bookings/:id/end
export const endEarly = async (req, res, next) => {
  try {
    const booking = await endBooking(req.params.id, req.user);
    return sendSuccess(res, 200, 'Booking ended successfully', booking);
  } catch (error) {
    next(error);
  }
};

// POST /api/bookings/:id/cancel
export const cancel = async (req, res, next) => {
  try {
    const booking = await cancelBooking(req.params.id, req.user);
    return sendSuccess(res, 200, 'Booking cancelled successfully', booking);
  } catch (error) {
    next(error);
  }
};

// POST /api/bookings/:id/extend
export const extend = async (req, res, next) => {
  try {
    const { endTime } = req.body;
    if (!endTime) {
      return sendError(res, 400, 'endTime is required to extend booking.');
    }
    const booking = await extendBooking(req.params.id, endTime, req.user);
    return sendSuccess(res, 200, 'Booking extended successfully', booking);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/bookings/:id (Ownership Check & Cancellation Enforced)
export const deleteBooking = async (req, res, next) => {
  try {
    const booking = await cancelBooking(req.params.id, req.user);
    return sendSuccess(res, 200, 'Booking cancelled successfully', booking);
  } catch (error) {
    next(error);
  }
};

