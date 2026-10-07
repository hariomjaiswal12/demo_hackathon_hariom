import { Resource } from '../models/Resource.js';
import { Booking } from '../models/Booking.js';
import { sendSuccess, sendError } from '../utils/response.js';

// GET /api/resources
export const getResources = async (req, res, next) => {
  try {
    const { category, status, search } = req.query;
    const query = {};

    if (category) {
      query.category = category.toUpperCase();
    }
    if (status) {
      query.status = status.toUpperCase();
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { resourceCode: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ];
    }

    const resources = await Resource.find(query).sort({ createdAt: -1 });
    return sendSuccess(res, 200, 'Resources retrieved successfully', resources);
  } catch (error) {
    next(error);
  }
};

// GET /api/resources/:id
export const getResourceById = async (req, res, next) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return sendError(res, 404, 'Resource not found');
    }
    return sendSuccess(res, 200, 'Resource details retrieved', resource);
  } catch (error) {
    next(error);
  }
};

// POST /api/resources
export const createResource = async (req, res, next) => {
  try {
    const { name, resourceCode, category, status, location, description, specifications, image, requiresBadgeSignout } = req.body;

    if (!name || !resourceCode || !location) {
      return sendError(res, 400, 'Resource name, code, and location are required.');
    }

    const newResource = await Resource.create({
      name,
      resourceCode,
      category: category ? category.toUpperCase().replace(/\s+&\s+/g, '_') : 'AUDIO',
      status: status ? status.toUpperCase().replace(/\s+/g, '_') : 'AVAILABLE',
      location,
      description: description || '',
      specifications: specifications || [],
      image: image || '',
      requiresBadgeSignout: requiresBadgeSignout !== undefined ? requiresBadgeSignout : true,
    });

    return sendSuccess(res, 201, 'Resource created successfully', newResource);
  } catch (error) {
    next(error);
  }
};

// PATCH /api/resources/:id
export const updateResource = async (req, res, next) => {
  try {
    const updatedResource = await Resource.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedResource) {
      return sendError(res, 404, 'Resource not found');
    }

    return sendSuccess(res, 200, 'Resource updated successfully', updatedResource);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/resources/:id
export const deleteResource = async (req, res, next) => {
  try {
    const deletedResource = await Resource.findByIdAndDelete(req.params.id);
    if (!deletedResource) {
      return sendError(res, 404, 'Resource not found');
    }
    return sendSuccess(res, 200, 'Resource deleted successfully');
  } catch (error) {
    next(error);
  }
};

// GET /api/resources/:id/availability
export const getResourceAvailability = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { start, end } = req.query;

    const resource = await Resource.findById(id);
    if (!resource) {
      return sendError(res, 404, 'Resource not found');
    }

    // Default time window: Today 00:00 to 23:59 if start/end omitted
    const startDate = start ? new Date(start) : new Date(new Date().setHours(0, 0, 0, 0));
    const endDate = end ? new Date(end) : new Date(new Date().setHours(23, 59, 59, 999));

    const bookings = await Booking.find({
      resource: id,
      status: { $in: ['CONFIRMED', 'ACTIVE'] },
      startTime: { $lt: endDate },
      endTime: { $gt: startDate },
    }).sort({ startTime: 1 });

    return sendSuccess(res, 200, 'Resource availability retrieved', {
      resource: {
        id: resource._id,
        name: resource.name,
        code: resource.resourceCode,
        location: resource.location,
        status: resource.status,
      },
      timeRange: { start: startDate, end: endDate },
      bookings: bookings.map((b) => ({
        id: b._id,
        startTime: b.startTime,
        endTime: b.endTime,
        status: b.status,
        purpose: b.purpose,
        passcode: b.passcode,
      })),
    });
  } catch (error) {
    next(error);
  }
};
