import { Booking } from '../models/Booking.js';
import { Resource } from '../models/Resource.js';

// Verify booking ownership (USER can only modify own booking, ADMIN can manage any)
export const validateBookingOwnership = (booking, currentUser) => {
  if (!currentUser) {
    const err = new Error('Authentication required.');
    err.statusCode = 401;
    throw err;
  }

  if (currentUser.role === 'ADMIN') return true;

  if (!booking.user || booking.user.toString() !== currentUser._id.toString()) {
    const err = new Error('Forbidden: You do not have permission to modify this booking.');
    err.statusCode = 403;
    throw err;
  }

  return true;
};

// Check server-side booking time overlap against existing active/confirmed bookings
export const checkBookingOverlap = async (resourceId, start, end, excludeBookingId = null) => {
  const requestedStart = new Date(start);
  const requestedEnd = new Date(end);

  if (isNaN(requestedStart.getTime()) || isNaN(requestedEnd.getTime())) {
    const err = new Error('Invalid start or end date format.');
    err.statusCode = 400;
    throw err;
  }

  if (requestedStart >= requestedEnd) {
    const err = new Error('Start time must be before end time.');
    err.statusCode = 400;
    throw err;
  }

  // 1. Verify resource exists and is available
  const resource = await Resource.findById(resourceId);
  if (!resource) {
    const err = new Error('Resource not found.');
    err.statusCode = 404;
    throw err;
  }

  if (resource.status === 'MAINTENANCE') {
    const err = new Error('Resource is currently under maintenance and cannot be booked.');
    err.statusCode = 400;
    throw err;
  }

  // 2. Query for overlapping active/confirmed bookings
  // Overlap condition: existing.startTime < requestedEnd AND existing.endTime > requestedStart
  const query = {
    resource: resourceId,
    status: { $in: ['CONFIRMED', 'ACTIVE'] },
    startTime: { $lt: requestedEnd },
    endTime: { $gt: requestedStart },
  };

  if (excludeBookingId) {
    query._id = { $ne: excludeBookingId };
  }

  const conflictingBooking = await Booking.findOne(query);

  if (conflictingBooking) {
    const err = new Error('Resource is already booked for the requested time.');
    err.statusCode = 409;
    err.conflict = true;
    err.conflictingBooking = conflictingBooking;
    throw err;
  }

  return { resource, requestedStart, requestedEnd };
};

// Check-In Service Function (CONFIRMED -> ACTIVE)
export const checkInBooking = async (bookingId, currentUser) => {
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    const err = new Error('Booking not found.');
    err.statusCode = 404;
    throw err;
  }

  validateBookingOwnership(booking, currentUser);

  if (booking.status === 'ACTIVE') {
    const err = new Error('Booking is already checked in and active.');
    err.statusCode = 400;
    throw err;
  }

  if (booking.status !== 'CONFIRMED') {
    const err = new Error(`Booking cannot be checked in because it is ${booking.status.toLowerCase()}.`);
    err.statusCode = 400;
    throw err;
  }

  booking.status = 'ACTIVE';
  booking.checkInAt = new Date();
  await booking.save();

  return Booking.findById(booking._id).populate('resource', 'name resourceCode location category image');
};

// End Early / Complete Service Function (ACTIVE -> COMPLETED)
export const endBooking = async (bookingId, currentUser) => {
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    const err = new Error('Booking not found.');
    err.statusCode = 404;
    throw err;
  }

  validateBookingOwnership(booking, currentUser);

  if (booking.status === 'COMPLETED') {
    const err = new Error('Booking is already completed.');
    err.statusCode = 400;
    throw err;
  }

  if (booking.status !== 'ACTIVE') {
    const err = new Error(`Only active bookings can be completed. Current status: ${booking.status}`);
    err.statusCode = 400;
    throw err;
  }

  booking.status = 'COMPLETED';
  booking.endTime = new Date();
  await booking.save();

  return Booking.findById(booking._id).populate('resource', 'name resourceCode location category image');
};

// Cancel Service Function (CONFIRMED -> CANCELLED)
export const cancelBooking = async (bookingId, currentUser) => {
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    const err = new Error('Booking not found.');
    err.statusCode = 404;
    throw err;
  }

  validateBookingOwnership(booking, currentUser);

  if (booking.status === 'CANCELLED') {
    const err = new Error('Booking is already cancelled.');
    err.statusCode = 400;
    throw err;
  }

  if (booking.status === 'COMPLETED') {
    const err = new Error('Cannot cancel an already completed booking.');
    err.statusCode = 400;
    throw err;
  }

  if (booking.status === 'AUTO_RELEASED') {
    const err = new Error('Cannot cancel an auto-released booking.');
    err.statusCode = 400;
    throw err;
  }

  booking.status = 'CANCELLED';
  await booking.save();

  return Booking.findById(booking._id).populate('resource', 'name resourceCode location category image');
};

// Extend Service Function (ACTIVE/CONFIRMED -> EXTENDED with overlap check)
export const extendBooking = async (bookingId, newEndTime, currentUser) => {
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    const err = new Error('Booking not found.');
    err.statusCode = 404;
    throw err;
  }

  validateBookingOwnership(booking, currentUser);

  if (['COMPLETED', 'CANCELLED', 'AUTO_RELEASED'].includes(booking.status)) {
    const err = new Error(`Cannot extend a booking with status ${booking.status}.`);
    err.statusCode = 400;
    throw err;
  }

  const requestedEnd = new Date(newEndTime);
  if (isNaN(requestedEnd.getTime())) {
    const err = new Error('Invalid extension end time.');
    err.statusCode = 400;
    throw err;
  }

  if (requestedEnd <= new Date(booking.startTime)) {
    const err = new Error('Extension end time must be after start time.');
    err.statusCode = 400;
    throw err;
  }

  // Server-side overlap check excluding current booking
  await checkBookingOverlap(booking.resource, booking.startTime, requestedEnd, booking._id);

  booking.endTime = requestedEnd;
  await booking.save();

  return Booking.findById(booking._id).populate('resource', 'name resourceCode location category image');
};

