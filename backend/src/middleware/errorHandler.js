import { sendError } from '../utils/response.js';

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = err.errors || [];
  let extra = {};

  // Handle Mongoose CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ID format for ${err.path}`;
    errors = [`Cast to ${err.kind} failed for value "${err.value}" at path "${err.path}"`];
  }

  // Handle Mongoose ValidationError
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    errors = Object.values(err.errors).map((e) => e.message);
  }

  // Handle Duplicate Key Error (E11000)
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    const value = err.keyValue ? err.keyValue[field] : '';
    message = `Duplicate value '${value}' for field '${field}'`;
    errors = [`${field} must be unique`];
  }

  // Handle 409 Conflict Errors
  if (err.conflict || statusCode === 409) {
    statusCode = 409;
    extra.conflict = true;
  }

  if (process.env.NODE_ENV === 'development') {
    console.error(`[Error] ${statusCode} - ${message}:`, err);
  }

  return sendError(res, statusCode, message, errors, extra);
};
